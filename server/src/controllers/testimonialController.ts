import { Request, Response, NextFunction } from 'express';
import { Testimonial } from '../models/Testimonial';
import { AppError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAdminAction } from '../services/auditService';

// Public: Get only approved & published testimonials
export const getPublicTestimonials = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonials = await Testimonial.find({ isApproved: true, isPublished: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      testimonials
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all testimonials
export const getAllTestimonialsAdmin = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      testimonials
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create testimonial
export const createTestimonial = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonial = await Testimonial.create(req.body);

    await logAdminAction({
      req,
      action: 'CREATE_TESTIMONIAL',
      entityType: 'Testimonial',
      entityId: testimonial._id.toString(),
      details: { clientName: testimonial.clientName, isApproved: testimonial.isApproved }
    });

    res.status(201).json({
      success: true,
      message: 'Testimonial created successfully',
      testimonial
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update testimonial (approval/publish state)
export const updateTestimonial = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    await logAdminAction({
      req,
      action: 'UPDATE_TESTIMONIAL',
      entityType: 'Testimonial',
      entityId: testimonial._id.toString(),
      details: { clientName: testimonial.clientName, isApproved: testimonial.isApproved }
    });

    res.status(200).json({
      success: true,
      message: 'Testimonial updated successfully',
      testimonial
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete testimonial
export const deleteTestimonial = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    await logAdminAction({
      req,
      action: 'DELETE_TESTIMONIAL',
      entityType: 'Testimonial',
      entityId: req.params.id as string
    });

    res.status(200).json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
