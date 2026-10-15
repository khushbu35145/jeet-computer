import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolioProject extends Document {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  techStack: string[];
  features: string[];
  liveUrl?: string;
  demoUrl?: string;
  thumbnailUrl: string;
  galleryImages: string[];
  isDemo: boolean;
  isPublished: boolean;
  order: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioProjectSchema = new Schema<IPortfolioProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
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
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: 300
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required']
    },
    techStack: {
      type: [String],
      default: []
    },
    features: {
      type: [String],
      default: []
    },
    liveUrl: {
      type: String
    },
    demoUrl: {
      type: String
    },
    thumbnailUrl: {
      type: String,
      required: [true, 'Thumbnail is required']
    },
    galleryImages: {
      type: [String],
      default: []
    },
    isDemo: {
      type: Boolean,
      default: true // Demonstrations by default as required
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true
    },
    order: {
      type: Number,
      default: 0
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

portfolioProjectSchema.index({ category: 1, isPublished: 1, order: 1 });

export const PortfolioProject = mongoose.model<IPortfolioProject>('PortfolioProject', portfolioProjectSchema);
