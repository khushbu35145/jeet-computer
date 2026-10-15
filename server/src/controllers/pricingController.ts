import { Request, Response, NextFunction } from 'express';
import { PricingPackage } from '../models/PricingPackage';
import { AppError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAdminAction } from '../services/auditService';

// Public: Get active pricing packages
export const getPublicPricing = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const packages = await PricingPackage.find({ isActive: true }).sort({ order: 1, startingPrice: 1 });
    res.status(200).json({
      success: true,
      packages
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all packages
export const getAllPricingAdmin = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const packages = await PricingPackage.find().sort({ order: 1, startingPrice: 1 });
    res.status(200).json({
      success: true,
      packages
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create package
export const createPricingPackage = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existing = await PricingPackage.findOne({ slug: req.body.slug });
    if (existing) {
      throw new AppError('A pricing package with this URL slug already exists', 400);
    }

    const pkg = await PricingPackage.create(req.body);

    await logAdminAction({
      req,
      action: 'CREATE_PRICING_PACKAGE',
      entityType: 'PricingPackage',
      entityId: pkg._id.toString(),
      details: { title: pkg.title, startingPrice: pkg.startingPrice }
    });

    res.status(201).json({
      success: true,
      message: 'Pricing package created successfully',
      package: pkg
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update package
export const updatePricingPackage = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pkg = await PricingPackage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!pkg) {
      throw new AppError('Pricing package not found', 404);
    }

    await logAdminAction({
      req,
      action: 'UPDATE_PRICING_PACKAGE',
      entityType: 'PricingPackage',
      entityId: pkg._id.toString(),
      details: { title: pkg.title, startingPrice: pkg.startingPrice }
    });

    res.status(200).json({
      success: true,
      message: 'Pricing package updated successfully',
      package: pkg
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete package
export const deletePricingPackage = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pkg = await PricingPackage.findByIdAndDelete(req.params.id);
    if (!pkg) {
      throw new AppError('Pricing package not found', 404);
    }

    await logAdminAction({
      req,
      action: 'DELETE_PRICING_PACKAGE',
      entityType: 'PricingPackage',
      entityId: req.params.id as string,
      details: { title: pkg.title }
    });

    res.status(200).json({
      success: true,
      message: 'Pricing package deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
