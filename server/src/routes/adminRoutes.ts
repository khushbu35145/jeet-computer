import { Router } from 'express';
import {
  login,
  logout,
  getMe,
  changePassword,
  forgotPassword,
  resetPassword
} from '../controllers/authController';
import {
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  exportEnquiriesToCsv
} from '../controllers/enquiryController';
import {
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController';
import {
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/portfolioController';
import {
  getAllPricingAdmin,
  createPricingPackage,
  updatePricingPackage,
  deletePricingPackage
} from '../controllers/pricingController';
import {
  getAllBlogPostsAdmin,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../controllers/blogController';
import {
  getAllFAQsAdmin,
  createFAQ,
  updateFAQ,
  deleteFAQ
} from '../controllers/faqController';
import {
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController';
import { getAllSettingsAdmin, updateSettings } from '../controllers/settingController';
import { getDashboardStats } from '../controllers/dashboardController';
import { authenticateAdmin } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validate';
import {
  loginSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../validators/authValidator';
import { updateEnquiryStatusSchema } from '../validators/enquiryValidator';
import { serviceSchema } from '../validators/serviceValidator';
import { portfolioProjectSchema } from '../validators/portfolioValidator';
import { pricingPackageSchema } from '../validators/pricingValidator';
import { blogPostSchema } from '../validators/blogValidator';
import { uploadImage } from '../middleware/upload';

const router = Router();

// --- Auth Routes ---
router.post('/auth/login', authLimiter, validate(loginSchema), login);
router.post('/auth/logout', authenticateAdmin, logout);
router.get('/auth/me', authenticateAdmin, getMe);
router.post('/auth/change-password', authenticateAdmin, validate(changePasswordSchema), changePassword);
router.post('/auth/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/auth/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword);

// --- Dashboard ---
router.get('/dashboard', authenticateAdmin, getDashboardStats);

// --- Enquiry CRM ---
router.get('/enquiries/export', authenticateAdmin, exportEnquiriesToCsv);
router.get('/enquiries', authenticateAdmin, getEnquiries);
router.get('/enquiries/:id', authenticateAdmin, getEnquiryById);
router.patch('/enquiries/:id', authenticateAdmin, validate(updateEnquiryStatusSchema), updateEnquiry);

// --- Services Management ---
router.get('/services', authenticateAdmin, getAllServicesAdmin);
router.post('/services', authenticateAdmin, validate(serviceSchema), createService);
router.put('/services/:id', authenticateAdmin, updateService);
router.delete('/services/:id', authenticateAdmin, deleteService);

// --- Portfolio Management ---
router.get('/portfolio', authenticateAdmin, getAllProjectsAdmin);
router.post('/portfolio', authenticateAdmin, validate(portfolioProjectSchema), createProject);
router.put('/portfolio/:id', authenticateAdmin, updateProject);
router.delete('/portfolio/:id', authenticateAdmin, deleteProject);

// --- Pricing Packages Management ---
router.get('/pricing', authenticateAdmin, getAllPricingAdmin);
router.post('/pricing', authenticateAdmin, validate(pricingPackageSchema), createPricingPackage);
router.put('/pricing/:id', authenticateAdmin, updatePricingPackage);
router.delete('/pricing/:id', authenticateAdmin, deletePricingPackage);

// --- Blog Management ---
router.get('/blog', authenticateAdmin, getAllBlogPostsAdmin);
router.post('/blog', authenticateAdmin, validate(blogPostSchema), createBlogPost);
router.put('/blog/:id', authenticateAdmin, updateBlogPost);
router.delete('/blog/:id', authenticateAdmin, deleteBlogPost);

// --- FAQ Management ---
router.get('/faqs', authenticateAdmin, getAllFAQsAdmin);
router.post('/faqs', authenticateAdmin, createFAQ);
router.put('/faqs/:id', authenticateAdmin, updateFAQ);
router.delete('/faqs/:id', authenticateAdmin, deleteFAQ);

// --- Testimonials Moderation ---
router.get('/testimonials', authenticateAdmin, getAllTestimonialsAdmin);
router.post('/testimonials', authenticateAdmin, createTestimonial);
router.put('/testimonials/:id', authenticateAdmin, updateTestimonial);
router.delete('/testimonials/:id', authenticateAdmin, deleteTestimonial);

// --- Site Settings ---
router.get('/settings', authenticateAdmin, getAllSettingsAdmin);
router.post('/settings', authenticateAdmin, updateSettings);

// --- File Upload ---
router.post('/upload/image', authenticateAdmin, uploadImage.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No image file uploaded' });
    return;
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({
    success: true,
    imageUrl,
    filename: req.file.filename
  });
});

export default router;
