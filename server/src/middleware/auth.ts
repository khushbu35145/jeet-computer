import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminUser, IAdminUser } from '../models/AdminUser';
import { AppError } from './errorHandler';

export interface AuthenticatedRequest extends Request {
  user?: IAdminUser;
}

interface JwtPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export const authenticateAdmin = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // 1. Check Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // 2. Check HTTP-only cookie
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new AppError('Authentication required. Please sign in.', 401);
    }

    const secret = process.env.JWT_SECRET || 'jeet_secret_jwt_key_2026_production_fallback';
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await AdminUser.findById(decoded.id).select('+passwordHash');
    if (!user || !user.isActive) {
      throw new AppError('Admin account not found or has been deactivated', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRole = (...allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new AppError('Access forbidden: insufficient permissions', 403);
    }
    next();
  };
};
