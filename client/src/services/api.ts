import {
  IService,
  IPortfolioProject,
  IPricingPackage,
  IBlogPost,
  IFAQ,
  ITestimonial,
  ISiteSettings,
  IEnquiry,
  IAdminUser
} from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api/v1';

// Token helpers
export const getStoredToken = (): string | null => localStorage.getItem('jeet_admin_token');
export const setStoredToken = (token: string): void => localStorage.setItem('jeet_admin_token', token);
export const removeStoredToken = (): void => localStorage.removeItem('jeet_admin_token');

// Generic Fetch Wrapper
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>)
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include'
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `API request failed with status ${response.status}`);
  }

  return data as T;
}

// Public API Service
export const api = {
  // Services
  getServices: () => request<{ success: boolean; services: IService[] }>('/services'),
  getServiceBySlug: (slug: string) => request<{ success: boolean; service: IService }>(`/services/${slug}`),

  // Portfolio
  getPortfolio: (category?: string) =>
    request<{ success: boolean; projects: IPortfolioProject[] }>(`/portfolio${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getProjectBySlug: (slug: string) => request<{ success: boolean; project: IPortfolioProject }>(`/portfolio/${slug}`),

  // Pricing
  getPricing: () => request<{ success: boolean; packages: IPricingPackage[] }>('/pricing'),

  // Blog
  getBlogPosts: (category?: string, page = 1) =>
    request<{ success: boolean; posts: IBlogPost[]; pagination: any }>(
      `/blog?page=${page}${category ? `&category=${encodeURIComponent(category)}` : ''}`
    ),
  getBlogPostBySlug: (slug: string) =>
    request<{ success: boolean; post: IBlogPost; relatedPosts: IBlogPost[] }>(`/blog/${slug}`),

  // FAQs
  getFAQs: (category?: string, serviceSlug?: string) => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (serviceSlug) params.append('serviceSlug', serviceSlug);
    return request<{ success: boolean; faqs: IFAQ[] }>(`/faqs?${params.toString()}`);
  },

  // Testimonials
  getTestimonials: () => request<{ success: boolean; testimonials: ITestimonial[] }>('/testimonials'),

  // Site Settings
  getSettings: () => request<{ success: boolean; settings: ISiteSettings }>('/settings/public'),

  // Enquiry Submission
  submitEnquiry: (formData: any) =>
    request<{ success: boolean; message: string; refNumber: string; whatsappFollowupUrl: string }>('/enquiries', {
      method: 'POST',
      body: JSON.stringify(formData)
    }),

  // Admin APIs
  admin: {
    login: (credentials: { usernameOrEmail: string; password: string }) =>
      request<{ success: boolean; token: string; user: IAdminUser; message: string }>('/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      }),
    logout: () => request<{ success: boolean; message: string }>('/admin/auth/logout', { method: 'POST' }),
    getMe: () => request<{ success: boolean; user: IAdminUser }>('/admin/auth/me'),
    changePassword: (data: any) =>
      request<{ success: boolean; message: string }>('/admin/auth/change-password', {
        method: 'POST',
        body: JSON.stringify(data)
      }),
    getDashboardStats: () =>
      request<{
        success: boolean;
        stats: any;
        statusSummary: Record<string, number>;
        recentEnquiries: IEnquiry[];
      }>('/admin/dashboard'),

    // Enquiry CRM
    getEnquiries: (params: { page?: number; limit?: number; status?: string; search?: string }) => {
      const q = new URLSearchParams();
      if (params.page) q.append('page', params.page.toString());
      if (params.limit) q.append('limit', params.limit.toString());
      if (params.status) q.append('status', params.status);
      if (params.search) q.append('search', params.search);
      return request<{ success: boolean; enquiries: IEnquiry[]; pagination: any }>(`/admin/enquiries?${q.toString()}`);
    },
    getEnquiryById: (id: string) => request<{ success: boolean; enquiry: IEnquiry }>(`/admin/enquiries/${id}`),
    updateEnquiry: (id: string, data: any) =>
      request<{ success: boolean; message: string; enquiry: IEnquiry }>(`/admin/enquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      }),

    // Management CRUD
    getServices: () => request<{ success: boolean; services: IService[] }>('/admin/services'),
    createService: (data: any) => request<{ success: boolean; service: IService }>('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
    updateService: (id: string, data: any) => request<{ success: boolean; service: IService }>(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteService: (id: string) => request<{ success: boolean; message: string }>(`/admin/services/${id}`, { method: 'DELETE' }),

    getPortfolio: () => request<{ success: boolean; projects: IPortfolioProject[] }>('/admin/portfolio'),
    createProject: (data: any) => request<{ success: boolean; project: IPortfolioProject }>('/admin/portfolio', { method: 'POST', body: JSON.stringify(data) }),
    updateProject: (id: string, data: any) => request<{ success: boolean; project: IPortfolioProject }>(`/admin/portfolio/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteProject: (id: string) => request<{ success: boolean; message: string }>(`/admin/portfolio/${id}`, { method: 'DELETE' }),

    getPricing: () => request<{ success: boolean; packages: IPricingPackage[] }>('/admin/pricing'),
    createPricingPackage: (data: any) => request<{ success: boolean; package: IPricingPackage }>('/admin/pricing', { method: 'POST', body: JSON.stringify(data) }),
    updatePricingPackage: (id: string, data: any) => request<{ success: boolean; package: IPricingPackage }>(`/admin/pricing/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deletePricingPackage: (id: string) => request<{ success: boolean; message: string }>(`/admin/pricing/${id}`, { method: 'DELETE' }),

    getBlogPosts: () => request<{ success: boolean; posts: IBlogPost[] }>('/admin/blog'),
    createBlogPost: (data: any) => request<{ success: boolean; post: IBlogPost }>('/admin/blog', { method: 'POST', body: JSON.stringify(data) }),
    updateBlogPost: (id: string, data: any) => request<{ success: boolean; post: IBlogPost }>(`/admin/blog/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteBlogPost: (id: string) => request<{ success: boolean; message: string }>(`/admin/blog/${id}`, { method: 'DELETE' }),

    getFAQs: () => request<{ success: boolean; faqs: IFAQ[] }>('/admin/faqs'),
    createFAQ: (data: any) => request<{ success: boolean; faq: IFAQ }>('/admin/faqs', { method: 'POST', body: JSON.stringify(data) }),
    updateFAQ: (id: string, data: any) => request<{ success: boolean; faq: IFAQ }>(`/admin/faqs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteFAQ: (id: string) => request<{ success: boolean; message: string }>(`/admin/faqs/${id}`, { method: 'DELETE' }),

    getTestimonials: () => request<{ success: boolean; testimonials: ITestimonial[] }>('/admin/testimonials'),
    createTestimonial: (data: any) => request<{ success: boolean; testimonial: ITestimonial }>('/admin/testimonials', { method: 'POST', body: JSON.stringify(data) }),
    updateTestimonial: (id: string, data: any) => request<{ success: boolean; testimonial: ITestimonial }>(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteTestimonial: (id: string) => request<{ success: boolean; message: string }>(`/admin/testimonials/${id}`, { method: 'DELETE' }),

    getSettings: () => request<{ success: boolean; settings: any[] }>('/admin/settings'),
    updateSettings: (settings: any[]) => request<{ success: boolean; message: string }>('/admin/settings', { method: 'POST', body: JSON.stringify({ settings }) })
  }
};
