export const ENQUIRY_STATUSES = [
  'New',
  'Contacted',
  'Requirement Discussion',
  'Quotation Sent',
  'Negotiation',
  'Approved',
  'In Development',
  'Completed',
  'Rejected'
] as const;

export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const SERVICE_CATEGORIES = [
  'Static Website Development',
  'Dynamic Website Development',
  'Business and Corporate Websites',
  'E-commerce Websites',
  'School, College and Coaching Institute Websites',
  'Portfolio and Personal Websites',
  'Blog, News and Magazine Websites',
  'Job Portals',
  'Real Estate Websites',
  'Hotel and Restaurant Websites',
  'Booking and Appointment Websites',
  'Matrimonial and Directory Websites',
  'Landing Pages',
  'Custom Web Applications',
  'Admin Dashboards and Management Systems',
  'Customer Portals and Membership Websites',
  'Website Redesign and Maintenance'
] as const;

export const ADMIN_ROLES = ['superadmin', 'admin', 'editor'] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;
