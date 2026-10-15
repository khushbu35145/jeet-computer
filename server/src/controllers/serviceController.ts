import { Request, Response, NextFunction } from 'express';
import { Service } from '../models/Service';
import { AppError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAdminAction } from '../services/auditService';

// Public: Get all published services
export const getPublicServices = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const services = await Service.find({ isPublished: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      services
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get single service by slug
export const getPublicServiceBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const service = await Service.findOne({ slug: req.params.slug, isPublished: true });
    if (!service) {
      throw new AppError('Service not found or is currently unpublished', 404);
    }
    res.status(200).json({
      success: true,
      service
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all services
export const getAllServicesAdmin = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      services
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create service
export const createService = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existing = await Service.findOne({ slug: req.body.slug });
    if (existing) {
      throw new AppError('A service with this URL slug already exists', 400);
    }

    const service = await Service.create(req.body);

    await logAdminAction({
      req,
      action: 'CREATE_SERVICE',
      entityType: 'Service',
      entityId: service._id.toString(),
      details: { title: service.title, slug: service.slug }
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      service
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update service
export const updateService = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!service) {
      throw new AppError('Service not found', 404);
    }

    await logAdminAction({
      req,
      action: 'UPDATE_SERVICE',
      entityType: 'Service',
      entityId: service._id.toString(),
      details: { title: service.title }
    });

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      service
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete service
export const deleteService = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      throw new AppError('Service not found', 404);
    }

    await logAdminAction({
      req,
      action: 'DELETE_SERVICE',
      entityType: 'Service',
      entityId: req.params.id as string,
      details: { title: service.title }
    });

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
