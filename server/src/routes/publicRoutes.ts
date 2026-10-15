import { Router } from 'express';
import { getPublicServices, getPublicServiceBySlug } from '../controllers/serviceController';
import { getPublicPortfolio, getPublicProjectBySlug } from '../controllers/portfolioController';
import { getPublicPricing } from '../controllers/pricingController';
import { getPublicBlogPosts, getPublicBlogPostBySlug } from '../controllers/blogController';
import { getPublicFAQs } from '../controllers/faqController';
import { getPublicTestimonials } from '../controllers/testimonialController';
import { submitEnquiry } from '../controllers/enquiryController';
import { getPublicSettings } from '../controllers/settingController';
import { enquiryLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validate';
import { createEnquirySchema } from '../validators/enquiryValidator';
import { uploadAttachment } from '../middleware/upload';

const router = Router();

// Services
router.get('/services', getPublicServices);
router.get('/services/:slug', getPublicServiceBySlug);

// Portfolio
router.get('/portfolio', getPublicPortfolio);
router.get('/portfolio/:slug', getPublicProjectBySlug);

// Pricing
router.get('/pricing', getPublicPricing);

// Blog
router.get('/blog', getPublicBlogPosts);
router.get('/blog/:slug', getPublicBlogPostBySlug);

// FAQs
router.get('/faqs', getPublicFAQs);

// Testimonials (approved and published only)
router.get('/testimonials', getPublicTestimonials);

// Public Settings
router.get('/settings/public', getPublicSettings);

// Project Enquiry Submission
router.post('/enquiries', enquiryLimiter, validate(createEnquirySchema), submitEnquiry);

// Optional public attachment upload for project enquiries
router.post('/upload/attachment', enquiryLimiter, uploadAttachment.single('attachment'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded' });
    return;
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.status(200).json({
    success: true,
    fileUrl,
    filename: req.file.originalname
  });
});

export default router;
