import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  isPublished: boolean;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  readTimeMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
      maxlength: 150
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: 350
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      index: true
    },
    tags: {
      type: [String],
      default: []
    },
    featuredImage: {
      type: String,
      required: [true, 'Featured image is required']
    },
    author: {
      type: String,
      default: 'JEET Technical Team'
    },
    isPublished: {
      type: Boolean,
      default: false,
      index: true
    },
    publishedAt: {
      type: Date
    },
    metaTitle: {
      type: String
    },
    metaDescription: {
      type: String
    },
    readTimeMinutes: {
      type: Number,
      default: 5
    }
  },
  {
    timestamps: true
  }
);

blogPostSchema.index({ isPublished: 1, publishedAt: -1 });

export const BlogPost = mongoose.model<IBlogPost>('BlogPost', blogPostSchema);
