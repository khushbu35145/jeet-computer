import { Request, Response, NextFunction } from 'express';
import { SiteSetting } from '../models/SiteSetting';
import { AppError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import { logAdminAction } from '../services/auditService';

// Public: Return only safe public settings
export const getPublicSettings = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const settings = await SiteSetting.find({ isPublic: true }).lean();
    
    // Map to key-value object
    const settingsMap: Record<string, any> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    // Fallbacks if not seeded yet
    const fallbackSettings = {
      brandName: process.env.BRAND_NAME || 'JEET Computer Education',
      tagline: 'We Build Websites That Build Your Business',
      contactPhone: process.env.CONTACT_PHONE || '7413919688',
      contactPhoneAlt: process.env.CONTACT_PHONE_ALT || '8233316498',
      whatsappNumber: process.env.WHATSAPP_NUMBER || '917413919688',
      contactEmail: process.env.CONTACT_EMAIL || 'info@jeeteducation.com',
      officeAddress: process.env.OFFICE_ADDRESS || 'Pali, Rajasthan, 306401, India',
      defaultCtaText: 'Get a Free Quote',
      maintenanceMode: false,
      socialLinks: {
        facebook: 'https://facebook.com/jeetcomputereducation',
        instagram: 'https://instagram.com/jeetcomputereducation',
        linkedin: 'https://linkedin.com/company/jeetcomputereducation'
      }
    };

    res.status(200).json({
      success: true,
      settings: { ...fallbackSettings, ...settingsMap }
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Get all settings (including private configuration)
export const getAllSettingsAdmin = async (_req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const settings = await SiteSetting.find().sort({ category: 1, key: 1 }).lean();
    res.status(200).json({
      success: true,
      settings
    });
  } catch (error) {
    next(error);
  }
};

// Admin: Batch update settings
export const updateSettings = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { settings } = req.body; // array of { key, value, category, isPublic, description }

    if (!Array.isArray(settings)) {
      throw new AppError('Settings array is required', 400);
    }

    const bulkOps = settings.map((item) => ({
      updateOne: {
        filter: { key: item.key },
        update: {
          $set: {
            value: item.value,
            category: item.category || 'general',
            isPublic: item.isPublic !== undefined ? item.isPublic : true,
            description: item.description,
            updatedBy: req.user?.username || 'Admin'
          }
        },
        upsert: true
      }
    }));

    await SiteSetting.bulkWrite(bulkOps);

    await logAdminAction({
      req,
      action: 'UPDATE_SETTINGS',
      entityType: 'SiteSetting',
      details: { keysUpdated: settings.map((s) => s.key) }
    });

    res.status(200).json({
      success: true,
      message: 'Website settings updated successfully'
    });
  } catch (error) {
    next(error);
  }
};
