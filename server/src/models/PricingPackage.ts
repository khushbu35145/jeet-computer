import mongoose, { Document, Schema } from 'mongoose';

export interface IPricingPackage extends Document {
  title: string;
  slug: string;
  startingPrice: number;
  priceNote?: string;
  isCustomQuote: boolean;
  deliveryTimeEstimate: string;
  tagline: string;
  featuresIncluded: string[];
  exclusions: string[];
  isRecommended: boolean;
  isActive: boolean;
  order: number;
  badge?: string;
  createdAt: Date;
  updatedAt: Date;
}

const pricingPackageSchema = new Schema<IPricingPackage>(
  {
    title: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true,
      maxlength: 100
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true
    },
    startingPrice: {
      type: Number,
      required: [true, 'Starting price is required'],
      min: 0
    },
    priceNote: {
      type: String,
      default: 'Starting price. Actual price depends on specific functional requirements.'
    },
    isCustomQuote: {
      type: Boolean,
      default: false
    },
    deliveryTimeEstimate: {
      type: String,
      default: '3-7 working days'
    },
    tagline: {
      type: String,
      required: true
    },
    featuresIncluded: {
      type: [String],
      default: []
    },
    exclusions: {
      type: [String],
      default: []
    },
    isRecommended: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    order: {
      type: Number,
      default: 0
    },
    badge: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

pricingPackageSchema.index({ order: 1, isActive: 1 });

export const PricingPackage = mongoose.model<IPricingPackage>('PricingPackage', pricingPackageSchema);
