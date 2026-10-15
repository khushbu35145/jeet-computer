import mongoose, { Document, Schema } from 'mongoose';
import { ENQUIRY_STATUSES, EnquiryStatus } from '../config/constants';

export interface IEnquiryNote {
  note: string;
  author: string;
  createdAt: Date;
}

export interface IEnquiry extends Document {
  refNumber: string;
  fullName: string;
  businessName?: string;
  email: string;
  mobile: string;
  city: string;
  websiteType: string;
  isRedesign: boolean;
  preference: 'Static Website' | 'Dynamic Website' | 'Not Sure / Need Advice';
  pagesRequired?: string;
  featuresRequired: string[];
  approxBudget?: string;
  expectedDate?: string;
  domainHostingStatus?: string;
  referenceUrl?: string;
  projectDescription: string;
  attachmentUrl?: string;
  consentPrivacyPolicy: boolean;
  status: EnquiryStatus;
  internalNotes: IEnquiryNote[];
  quoteAmount?: number;
  followUpDate?: Date;
  assignedTo?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const enquirySchema = new Schema<IEnquiry>(
  {
    refNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: 100
    },
    businessName: {
      type: String,
      trim: true,
      maxlength: 150
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address']
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
      match: [/^[0-9+ -]{10,15}$/, 'Invalid mobile number']
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      maxlength: 100
    },
    websiteType: {
      type: String,
      required: [true, 'Website type is required']
    },
    isRedesign: {
      type: Boolean,
      default: false
    },
    preference: {
      type: String,
      enum: ['Static Website', 'Dynamic Website', 'Not Sure / Need Advice'],
      default: 'Not Sure / Need Advice'
    },
    pagesRequired: {
      type: String,
      default: '1-5 Pages'
    },
    featuresRequired: {
      type: [String],
      default: []
    },
    approxBudget: {
      type: String
    },
    expectedDate: {
      type: String
    },
    domainHostingStatus: {
      type: String
    },
    referenceUrl: {
      type: String
    },
    projectDescription: {
      type: String,
      required: [true, 'Project description is required'],
      minlength: 10,
      maxlength: 5000
    },
    attachmentUrl: {
      type: String
    },
    consentPrivacyPolicy: {
      type: Boolean,
      required: [true, 'Consent is required'],
      validate: {
        validator: (v: boolean) => v === true,
        message: 'You must agree to the privacy policy'
      }
    },
    status: {
      type: String,
      enum: ENQUIRY_STATUSES,
      default: 'New',
      index: true
    },
    internalNotes: [
      {
        note: { type: String, required: true },
        author: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    quoteAmount: {
      type: Number
    },
    followUpDate: {
      type: Date
    },
    assignedTo: {
      type: String
    },
    ipAddress: {
      type: String,
      select: false // Never leak client IPs publicly
    },
    userAgent: {
      type: String,
      select: false
    }
  },
  {
    timestamps: true
  }
);

enquirySchema.index({ createdAt: -1, status: 1 });

export const Enquiry = mongoose.model<IEnquiry>('Enquiry', enquirySchema);
