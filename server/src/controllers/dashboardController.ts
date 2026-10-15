import { Response, NextFunction } from 'express';
import { Enquiry } from '../models/Enquiry';
import { PortfolioProject } from '../models/PortfolioProject';
import { BlogPost } from '../models/BlogPost';
import { Service } from '../models/Service';
import { AuthenticatedRequest } from '../middleware/auth';
import { ENQUIRY_STATUSES } from '../config/constants';

export const getDashboardStats = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [
      totalEnquiries,
      newEnquiries,
      inProgressEnquiries,
      completedEnquiries,
      publishedPortfolio,
      publishedBlogs,
      totalServices,
      recentEnquiries,
      statusCounts
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'New' }),
      Enquiry.countDocuments({ status: { $in: ['Approved', 'In Development'] } }),
      Enquiry.countDocuments({ status: 'Completed' }),
      PortfolioProject.countDocuments({ isPublished: true }),
      BlogPost.countDocuments({ isPublished: true }),
      Service.countDocuments({ isPublished: true }),
      Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
      Enquiry.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    // Map statusCounts into a structured object containing all enum keys
    const statusSummary: Record<string, number> = {};
    ENQUIRY_STATUSES.forEach((st) => {
      statusSummary[st] = 0;
    });
    statusCounts.forEach((item) => {
      if (item._id) {
        statusSummary[item._id] = item.count;
      }
    });

    res.status(200).json({
      success: true,
      stats: {
        totalEnquiries,
        newEnquiries,
        inProgressEnquiries,
        completedEnquiries,
        publishedPortfolio,
        publishedBlogs,
        totalServices
      },
      statusSummary,
      recentEnquiries
    });
  } catch (error) {
    next(error);
  }
};
