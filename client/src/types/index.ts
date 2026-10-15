export interface IServiceFAQ {
  question: string;
  answer: string;
}

export interface IService {
  _id: string;
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
}

export interface IPortfolioProject {
  _id: string;
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
}

export interface IPricingPackage {
  _id: string;
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
}

export interface IEnquiryNote {
  note: string;
  author: string;
  createdAt: string;
}

export interface IEnquiry {
  _id: string;
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
  status:
    | 'New'
    | 'Contacted'
    | 'Requirement Discussion'
    | 'Quotation Sent'
    | 'Negotiation'
    | 'Approved'
    | 'In Development'
    | 'Completed'
    | 'Rejected';
  internalNotes: IEnquiryNote[];
  quoteAmount?: number;
  followUpDate?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  isPublished: boolean;
  publishedAt?: string;
  readTimeMinutes: number;
  createdAt: string;
}

export interface IFAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  serviceSlug?: string;
  order: number;
  isPublished: boolean;
}

export interface ITestimonial {
  _id: string;
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
}

export interface ISiteSettings {
  brandName: string;
  tagline: string;
  contactPhone: string;
  contactPhoneAlt: string;
  whatsappNumber: string;
  contactEmail: string;
  officeAddress: string;
  defaultCtaText: string;
  maintenanceMode: boolean;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export interface IAdminUser {
  id: string;
  username: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin' | 'editor';
  lastLogin?: string;
}
