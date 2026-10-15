import rateLimit from 'express-rate-limit';

// General API rate limiter: 100 requests per 15 minutes in production
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again after 15 minutes.'
  }
});

// Strict login rate limiter: 5 attempts per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Account access is temporarily locked for 15 minutes.'
  }
});

// Enquiry submission rate limiter: 5 submissions per 30 minutes to prevent spam
export const enquiryLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Multiple enquiry submissions detected. If you need urgent assistance, please contact us directly via WhatsApp or phone.'
  }
});
