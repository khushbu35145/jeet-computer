import { z } from 'zod';
import { ENQUIRY_STATUSES } from '../config/constants';

export const createEnquirySchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
    businessName: z.string().max(150).optional().nullable(),
    email: z.string().email('Invalid email address'),
    mobile: z.string().regex(/^[0-9+ -]{10,15}$/, 'Please enter a valid 10-15 digit phone number'),
    city: z.string().min(2, 'City is required').max(100),
    websiteType: z.string().min(2, 'Please select a website type'),
    isRedesign: z.boolean().optional().default(false),
    preference: z.enum(['Static Website', 'Dynamic Website', 'Not Sure / Need Advice']).default('Not Sure / Need Advice'),
    pagesRequired: z.string().optional(),
    featuresRequired: z.array(z.string()).optional().default([]),
    approxBudget: z.string().optional(),
    expectedDate: z.string().optional(),
    domainHostingStatus: z.string().optional(),
    referenceUrl: z.string().url('Reference website must be a valid URL').optional().or(z.literal('')),
    projectDescription: z.string().min(10, 'Please describe your project (minimum 10 characters)').max(5000),
    attachmentUrl: z.string().optional(),
    consentPrivacyPolicy: z.literal(true, {
      errorMap: () => ({ message: 'You must agree to the privacy policy to proceed.' })
    })
  })
});

export const updateEnquiryStatusSchema = z.object({
  body: z.object({
    status: z.enum(ENQUIRY_STATUSES).optional(),
    quoteAmount: z.number().min(0).optional(),
    followUpDate: z.string().datetime().optional().nullable(),
    assignedTo: z.string().optional(),
    internalNote: z.string().min(1).optional()
  })
});
