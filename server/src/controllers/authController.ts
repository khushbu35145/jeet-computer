import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { AdminUser } from '../models/AdminUser';
import { AppError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAdminAction } from '../services/auditService';

const signToken = (id: string, role: string): string => {
  const secret = process.env.JWT_SECRET || 'jeet_secret_jwt_key_2026_production_fallback';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign({ id, role }, secret, { expiresIn: expiresIn as any });
};

const sendTokenResponse = (user: any, statusCode: number, res: Response, message: string) => {
  const token = signToken(user._id.toString(), user.role);

  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: (process.env.NODE_ENV === 'production' ? 'strict' : 'lax') as 'strict' | 'lax'
  };

  res.cookie('token', token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      lastLogin: user.lastLogin
    }
  });
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await AdminUser.findOne({
      $or: [
        { username: usernameOrEmail.toLowerCase() },
        { email: usernameOrEmail.toLowerCase() }
      ]
    }).select('+passwordHash');

    if (!user || !user.isActive) {
      throw new AppError('Invalid credentials or account is deactivated', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    await logAdminAction({
      action: 'ADMIN_LOGIN',
      performedBy: user.username,
      adminEmail: user.email,
      entityType: 'AdminUser',
      entityId: user._id.toString(),
      details: { ip: req.ip }
    });

    sendTokenResponse(user, 200, res, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 5 * 1000),
      httpOnly: true
    });

    if (req.user) {
      await logAdminAction({
        req,
        action: 'ADMIN_LOGOUT',
        entityType: 'AdminUser',
        entityId: req.user._id.toString()
      });
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user) {
      throw new AppError('Not authenticated', 401);
    }

    res.status(200).json({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        lastLogin: req.user.lastLogin
      }
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await AdminUser.findById(req.user?._id).select('+passwordHash');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new AppError('Current password is incorrect', 400);
    }

    const salt = await bcrypt.genSalt(12);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    await user.save();

    await logAdminAction({
      req,
      action: 'PASSWORD_CHANGE',
      entityType: 'AdminUser',
      entityId: user._id.toString()
    });

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await AdminUser.findOne({ email: email.toLowerCase() });

    // Always respond with success to prevent user enumeration attacks
    if (!user) {
      res.status(200).json({
        success: true,
        message: 'If the email exists in our records, a secure reset token has been generated.'
      });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save({ validateBeforeSave: false });

    // In a production server, reset email is sent here
    console.log(`[Admin Password Reset] Token generated for ${user.email}: ${resetToken}`);

    res.status(200).json({
      success: true,
      message: 'If the email exists in our records, a secure reset token has been generated.',
      ...(process.env.NODE_ENV === 'development' ? { devResetToken: resetToken } : {})
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await AdminUser.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() }
    });

    if (!user) {
      throw new AppError('Password reset token is invalid or has expired', 400);
    }

    const salt = await bcrypt.genSalt(12);
    user.passwordHash = await bcrypt.hash(newPassword, salt);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    await logAdminAction({
      action: 'PASSWORD_RESET',
      performedBy: user.username,
      adminEmail: user.email,
      entityType: 'AdminUser',
      entityId: user._id.toString()
    });

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You may now log in.'
    });
  } catch (error) {
    next(error);
  }
};
