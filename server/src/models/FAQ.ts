import mongoose, { Document, Schema } from 'mongoose';

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category: string;
  serviceSlug?: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const faqSchema = new Schema<IFAQ>(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
      maxlength: 300
    },
    answer: {
      type: String,
      required: [true, 'Answer is required']
    },
    category: {
      type: String,
      default: 'General'
    },
    serviceSlug: {
      type: String,
      index: true
    },
    order: {
      type: Number,
      default: 0
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true
    }
  },
  {
    timestamps: true
  }
);

faqSchema.index({ serviceSlug: 1, isPublished: 1, order: 1 });

export const FAQ = mongoose.model<IFAQ>('FAQ', faqSchema);
