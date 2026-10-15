import { Request, Response, NextFunction } from 'express';
import { Enquiry } from '../models/Enquiry';
import { AppError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';
import { sendEnquiryNotificationEmail } from '../services/emailService';
import { logAdminAction } from '../services/auditService';

// Generates unique reference e.g., JEET-20261015-8492
const generateRefNumber = (): string => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `JEET-${dateStr}-${randomSuffix}`;
};

// Public endpoint: Submit new enquiry
export const submitEnquiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      fullName,
      businessName,
      email,
      mobile,
      city,
      websiteType,
      isRedesign,
      preference,
      pagesRequired,
      featuresRequired,
      approxBudget,
      expectedDate,
      domainHostingStatus,
      referenceUrl,
      projectDescription,
      attachmentUrl,
      consentPrivacyPolicy
    } = req.body;

    // Check duplicate submission in last 5 minutes from same email or mobile
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const existing = await Enquiry.findOne({
      $or: [{ email: email.toLowerCase() }, { mobile }],
      createdAt: { $gte: fiveMinutesAgo }
    });

    if (existing) {
      throw new AppError('A recent enquiry with this contact info was already received. Our technical team is reviewing it.', 429);
    }

    const refNumber = generateRefNumber();

    const enquiry = await Enquiry.create({
      refNumber,
      fullName,
      businessName,
      email: email.toLowerCase(),
      mobile,
      city,
      websiteType,
      isRedesign: Boolean(isRedesign),
      preference,
      pagesRequired,
      featuresRequired: featuresRequired || [],
      approxBudget,
      expectedDate,
      domainHostingStatus,
      referenceUrl,
      projectDescription,
      attachmentUrl,
      consentPrivacyPolicy,
      status: 'New',
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    // Notify via email asynchronously
    sendEnquiryNotificationEmail(enquiry).catch((err) => {
      console.warn('[EnquiryController] Background email notification notice:', err.message);
    });

    // Generate safe WhatsApp follow-up link (no private client details exposed in the URL)
    const encodedMsg = encodeURIComponent(
      `Hello JEET Computer Education, I have submitted a website development enquiry (Ref: ${refNumber}) for ${websiteType}. Please share details and pricing.`
    );
    const configuredPhone = process.env.WHATSAPP_NUMBER || '917413919688';
    const whatsappFollowupUrl = `https://wa.me/${configuredPhone}?text=${encodedMsg}`;

    res.status(201).json({
      success: true,
      message: 'Thank you! Your website enquiry has been received successfully.',
      refNumber: enquiry.refNumber,
      whatsappFollowupUrl
    });
  } catch (error) {
    next(error);
  }
};

// Admin endpoint: List enquiries with filters and pagination
export const getEnquiries = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 15;
    const skip = (page - 1) * limit;

    const { status, websiteType, search } = req.query;

    const filter: Record<string, any> = {};

    if (status && status !== 'All') {
      filter.status = status;
    }
    if (websiteType && websiteType !== 'All') {
      filter.websiteType = websiteType;
    }
    if (search) {
      const searchRegex = new RegExp(search as string, 'i');
      filter.$or = [
        { refNumber: searchRegex },
        { fullName: searchRegex },
        { businessName: searchRegex },
        { email: searchRegex },
        { mobile: searchRegex },
        { city: searchRegex }
      ];
    }

    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Enquiry.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      enquiries,
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

// Admin endpoint: Get single enquiry details
export const getEnquiryById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      throw new AppError('Enquiry not found', 404);
    }

    res.status(200).json({
      success: true,
      enquiry
    });
  } catch (error) {
    next(error);
  }
};

// Admin endpoint: Update status, quote, notes
export const updateEnquiry = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, quoteAmount, followUpDate, assignedTo, internalNote } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      throw new AppError('Enquiry not found', 404);
    }

    if (status) enquiry.status = status;
    if (quoteAmount !== undefined) enquiry.quoteAmount = quoteAmount;
    if (followUpDate !== undefined) enquiry.followUpDate = followUpDate ? new Date(followUpDate) : undefined;
    if (assignedTo !== undefined) enquiry.assignedTo = assignedTo;

    if (internalNote && internalNote.trim().length > 0) {
      enquiry.internalNotes.push({
        note: internalNote.trim(),
        author: req.user?.name || req.user?.username || 'Admin',
        createdAt: new Date()
      });
    }

    await enquiry.save();

    await logAdminAction({
      req,
      action: 'UPDATE_ENQUIRY',
      entityType: 'Enquiry',
      entityId: enquiry._id.toString(),
      details: { refNumber: enquiry.refNumber, status: enquiry.status, quoteAmount }
    });

    res.status(200).json({
      success: true,
      message: 'Enquiry updated successfully',
      enquiry
    });
  } catch (error) {
    next(error);
  }
};

// Admin endpoint: Export enquiries to CSV
export const exportEnquiriesToCsv = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 }).lean();

    const headers = [
      'Ref Number',
      'Created Date',
      'Client Name',
      'Business Name',
      'Email',
      'Mobile',
      'City',
      'Website Type',
      'Preference',
      'Budget',
      'Status',
      'Quote Amount',
      'Assigned To'
    ];

    const rows = enquiries.map((e) => [
      `"${e.refNumber}"`,
      `"${new Date(e.createdAt).toISOString().slice(0, 10)}"`,
      `"${(e.fullName || '').replace(/"/g, '""')}"`,
      `"${(e.businessName || '').replace(/"/g, '""')}"`,
      `"${e.email}"`,
      `"${e.mobile}"`,
      `"${(e.city || '').replace(/"/g, '""')}"`,
      `"${e.websiteType}"`,
      `"${e.preference}"`,
      `"${e.approxBudget || ''}"`,
      `"${e.status}"`,
      `"${e.quoteAmount || ''}"`,
      `"${e.assignedTo || ''}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    await logAdminAction({
      req,
      action: 'EXPORT_ENQUIRIES_CSV',
      entityType: 'Enquiry',
      details: { count: enquiries.length }
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=jeet-enquiries-${Date.now()}.csv`);
    res.status(200).send(csvContent);
  } catch (error) {
    next(error);
  }
};
