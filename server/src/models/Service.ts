import mongoose, { Document, Schema } from 'mongoose';

export interface IServiceFAQ {
  question: string;
  answer: string;
}

export interface IService extends Document {
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  suitableCustomers: string[];
  features: string[];
  developmentOptions: string[];
  benefits: string[];
  faqs: IServiceFAQ[];
  iconName: string;
  badge?: string;
  order: number;
  isPublished: boolean;
  metaTitle?: string;
  metaDescription?: string;
  ctaText?: string;
  createdAt: Date;
  updatedAt: Date;
}

const serviceSchema = new Schema<IService>(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: 120
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    tagline: {
      type: String,
      required: [true, 'Tagline is required'],
      trim: true,
      maxlength: 250
    },
    overview: {
      type: String,
      required: [true, 'Overview is required']
    },
    suitableCustomers: {
      type: [String],
      default: []
    },
    features: {
      type: [String],
      default: []
    },
    developmentOptions: {
      type: [String],
      default: []
    },
    benefits: {
      type: [String],
      default: []
    },
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ],
    iconName: {
      type: String,
      default: 'Globe'
    },
    badge: {
      type: String
    },
    order: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true
    },
    metaTitle: {
      type: String
    },
    metaDescription: {
      type: String
    },
    ctaText: {
      type: String,
      default: 'Get a Free Quote'
    }
  },
  {
    timestamps: true
  }
);

serviceSchema.index({ order: 1, isPublished: 1 });

export const Service = mongoose.model<IService>('Service', serviceSchema);
