import { Request, Response, NextFunction } from 'express';
import { PortfolioProject } from '../models/PortfolioProject';
import { AppError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAdminAction } from '../services/auditService';

// Public: Get published portfolio projects (with category filter)
export const getPublicPortfolio = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category } = req.query;
    const filter: Record<string, any> = { isPublished: true };

    if (category && category !== 'All') {
      filter.category = category;
    }

    const projects = await PortfolioProject.find(filter).sort({ featured: -1, order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      projects
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get single project by slug
export const getPublicProjectBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await PortfolioProject.findOne({ slug: req.params.slug, isPublished: true });
    if (!project) {
      throw new AppError('Portfolio project not found', 404);
    }

    res.status(200).json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all projects
export const getAllProjectsAdmin = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const projects = await PortfolioProject.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      projects
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create project
export const createProject = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existing = await PortfolioProject.findOne({ slug: req.body.slug });
    if (existing) {
      throw new AppError('A project with this URL slug already exists', 400);
    }

    const project = await PortfolioProject.create(req.body);

    await logAdminAction({
      req,
      action: 'CREATE_PORTFOLIO_PROJECT',
      entityType: 'PortfolioProject',
      entityId: project._id.toString(),
      details: { title: project.title, isDemo: project.isDemo }
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio project created successfully',
      project
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update project
export const updateProject = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await PortfolioProject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!project) {
      throw new AppError('Portfolio project not found', 404);
    }

    await logAdminAction({
      req,
      action: 'UPDATE_PORTFOLIO_PROJECT',
      entityType: 'PortfolioProject',
      entityId: project._id.toString(),
      details: { title: project.title }
    });

    res.status(200).json({
      success: true,
      message: 'Portfolio project updated successfully',
      project
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete project
export const deleteProject = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = await PortfolioProject.findByIdAndDelete(req.params.id);
    if (!project) {
      throw new AppError('Portfolio project not found', 404);
    }

    await logAdminAction({
      req,
      action: 'DELETE_PORTFOLIO_PROJECT',
      entityType: 'PortfolioProject',
      entityId: req.params.id as string,
      details: { title: project.title }
    });

    res.status(200).json({
      success: true,
      message: 'Portfolio project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
