import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSetting extends Document {
  key: string;
  value: any;
  category: 'general' | 'contact' | 'seo' | 'appearance' | 'email' | 'system';
  isPublic: boolean;
  description?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const siteSettingSchema = new Schema<ISiteSetting>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    value: {
      type: Schema.Types.Mixed,
      required: true
    },
    category: {
      type: String,
      enum: ['general', 'contact', 'seo', 'appearance', 'email', 'system'],
      default: 'general'
    },
    isPublic: {
      type: Boolean,
      default: true,
      index: true
    },
    description: {
      type: String
    },
    updatedBy: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const SiteSetting = mongoose.model<ISiteSetting>('SiteSetting', siteSettingSchema);
