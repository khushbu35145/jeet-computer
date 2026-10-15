import { Request, Response, NextFunction } from 'express';
import { BlogPost } from '../models/BlogPost';
import { AppError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAdminAction } from '../services/auditService';

// Public: Get published blog posts
export const getPublicBlogPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 6;
    const skip = (page - 1) * limit;

    const { category, tag } = req.query;
    const filter: Record<string, any> = { isPublished: true };

    if (category && category !== 'All') {
      filter.category = category;
    }
    if (tag) {
      filter.tags = tag;
    }

    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-content') // Keep listing light
        .lean(),
      BlogPost.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Public: Get single blog post by slug and fetch related posts
export const getPublicBlogPostBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true });
    if (!post) {
      throw new AppError('Blog article not found', 404);
    }

    // Related posts in same category
    const relatedPosts = await BlogPost.find({
      _id: { $ne: post._id },
      category: post.category,
      isPublished: true
    })
      .limit(3)
      .select('title slug excerpt featuredImage publishedAt')
      .lean();

    res.status(200).json({
      success: true,
      post,
      relatedPosts
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all blog posts
export const getAllBlogPostsAdmin = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Create blog post
export const createBlogPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existing = await BlogPost.findOne({ slug: req.body.slug });
    if (existing) {
      throw new AppError('A post with this URL slug already exists', 400);
    }

    const postData = {
      ...req.body,
      author: req.body.author || req.user?.name || 'JEET Technical Team',
      publishedAt: req.body.isPublished ? new Date() : undefined
    };

    const post = await BlogPost.create(postData);

    await logAdminAction({
      req,
      action: 'CREATE_BLOG_POST',
      entityType: 'BlogPost',
      entityId: post._id.toString(),
      details: { title: post.title, isPublished: post.isPublished }
    });

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      post
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Update blog post
export const updateBlogPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const current = await BlogPost.findById(req.params.id);
    if (!current) {
      throw new AppError('Blog post not found', 404);
    }

    const updateData = { ...req.body };
    if (req.body.isPublished && !current.publishedAt) {
      updateData.publishedAt = new Date();
    }

    const post = await BlogPost.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    await logAdminAction({
      req,
      action: 'UPDATE_BLOG_POST',
      entityType: 'BlogPost',
      entityId: req.params.id as string,
      details: { title: post?.title, isPublished: post?.isPublished }
    });

    res.status(200).json({
      success: true,
      message: 'Blog post updated successfully',
      post
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Delete blog post
export const deleteBlogPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      throw new AppError('Blog post not found', 404);
    }

    await logAdminAction({
      req,
      action: 'DELETE_BLOG_POST',
      entityType: 'BlogPost',
      entityId: req.params.id as string,
      details: { title: post.title }
    });

    res.status(200).json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
