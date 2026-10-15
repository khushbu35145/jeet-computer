import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  clientName: string;
  clientRole?: string;
  businessName?: string;
  city?: string;
  avatarUrl?: string;
  review: string;
  rating: number;
  isApproved: boolean;
  isPublished: boolean;
  isVerified: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: 100
    },
    clientRole: {
      type: String,
      trim: true,
      maxlength: 100
    },
    businessName: {
      type: String,
      trim: true,
      maxlength: 150
    },
    city: {
      type: String,
      trim: true,
      maxlength: 100
    },
    avatarUrl: {
      type: String
    },
    review: {
      type: String,
      required: [true, 'Review text is required'],
      maxlength: 1000
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5
    },
    isApproved: {
      type: Boolean,
      default: false // Must be explicitly verified and approved
    },
    isPublished: {
      type: Boolean,
      default: false, // Never automatically published without moderation
      index: true
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

testimonialSchema.index({ isApproved: 1, isPublished: 1, order: 1 });

export const Testimonial = mongoose.model<ITestimonial>('Testimonial', testimonialSchema);
