import { Request, Response, NextFunction } from 'express';
import { FAQ } from '../models/FAQ';
import { AppError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAdminAction } from '../services/auditService';

// Public: Get published FAQs
export const getPublicFAQs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, serviceSlug } = req.query;
    const filter: Record<string, any> = { isPublished: true };

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (serviceSlug) {
      filter.serviceSlug = serviceSlug;
    }

    const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({
      success: true,
      faqs
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all FAQs
export const getAllFAQsAdmin = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({
      success: true,
      faqs
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create FAQ
export const createFAQ = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const faq = await FAQ.create(req.body);

    await logAdminAction({
      req,
      action: 'CREATE_FAQ',
      entityType: 'FAQ',
      entityId: faq._id.toString(),
      details: { question: faq.question }
    });

    res.status(201).json({
      success: true,
      message: 'FAQ created successfully',
      faq
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update FAQ
export const updateFAQ = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }

    await logAdminAction({
      req,
      action: 'UPDATE_FAQ',
      entityType: 'FAQ',
      entityId: faq._id.toString()
    });

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully',
      faq
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete FAQ
export const deleteFAQ = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      throw new AppError('FAQ not found', 404);
    }

    await logAdminAction({
      req,
      action: 'DELETE_FAQ',
      entityType: 'FAQ',
      entityId: req.params.id as string
    });

    res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
