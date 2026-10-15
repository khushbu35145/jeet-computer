import request from 'supertest';
import app from '../src/app';
import { AdminUser } from '../src/models/AdminUser';
import { Service } from '../src/models/Service';
import { PortfolioProject } from '../src/models/PortfolioProject';
import { PricingPackage } from '../src/models/PricingPackage';
import { Enquiry } from '../src/models/Enquiry';
import { BlogPost } from '../src/models/BlogPost';
import { FAQ } from '../src/models/FAQ';
import { SiteSetting } from '../src/models/SiteSetting';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// Clean in-memory mock store for models
const mockServices = [
  {
    _id: 'srv-1',
    title: 'Static Website Development',
    slug: 'static-website-development',
    tagline: 'Blazing-fast websites from ₹2,999',
    overview: 'High speed static brochure sites.',
    isPublished: true,
    order: 1
  },
  {
    _id: 'srv-2',
    title: 'Unpublished Draft Service',
    slug: 'unpublished-draft-service',
    tagline: 'Internal WIP',
    overview: 'Should never appear in public listing.',
    isPublished: false,
    order: 2
  }
];

const mockPortfolio = [
  {
    _id: 'port-1',
    title: 'Pali Marble Exporters Demo',
    slug: 'pali-marble-demo',
    category: 'Business and Corporate Websites',
    shortDescription: 'Industrial stone showcase prototype.',
    fullDescription: 'Full architectural spec.',
    techStack: ['React', 'Node.js', 'MongoDB'],
    isDemo: true,
    isPublished: true,
    order: 1
  }
];

const mockPricing = [
  {
    _id: 'pkg-1',
    title: 'Basic Static Website',
    slug: 'basic-static-website',
    startingPrice: 2999,
    tagline: 'Budget friendly starter.',
    featuresIncluded: ['3 Pages', 'WhatsApp link'],
    exclusions: ['Database CMS'],
    isActive: true,
    order: 1
  }
];

const mockAdmin = {
  _id: '507f1f77bcf86cd799439011',
  username: 'testadmin',
  email: 'admin@jeeteducation.com',
  name: 'Lead Admin',
  role: 'superadmin',
  isActive: true,
  passwordHash: bcrypt.hashSync('JeetSecure123!', 10),
  comparePassword: async function (candidate: string) {
    return bcrypt.compare(candidate, this.passwordHash);
  },
  save: jest.fn().mockResolvedValue(true)
};

const mockEnquiries: any[] = [];

describe('=== REST API AUTOMATED TEST SUITE ===', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('1. Health Check & Basic Security Headers', () => {
    it('GET /health should return 200 with service health details', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('healthy');
      expect(res.body.service).toContain('JEET');
    });

    it('Security headers (Helmet) should be present on responses', async () => {
      const res = await request(app).get('/health');
      expect(res.headers['x-dns-prefetch-control']).toBeDefined();
      expect(res.headers['x-frame-options']).toBeDefined();
    });

    it('Non-existent endpoint should return 404 with structured JSON', async () => {
      const res = await request(app).get('/api/v1/non-existent-route-xyz');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toContain('does not exist');
    });
  });

  describe('2. Public Catalog APIs & Content Segregation', () => {
    it('GET /api/v1/services should return only published services', async () => {
      jest.spyOn(Service, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockServices.filter((s) => s.isPublished))
      } as any);

      const res = await request(app).get('/api/v1/services');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.services.length).toBe(1);
      expect(res.body.services[0].slug).toBe('static-website-development');
      // Ensure draft items are never leaked
      const leaked = res.body.services.some((s: any) => s.slug === 'unpublished-draft-service');
      expect(leaked).toBe(false);
    });

    it('GET /api/v1/services/:slug should return 404 if slug is unpublished', async () => {
      jest.spyOn(Service, 'findOne').mockResolvedValue(null);
      const res = await request(app).get('/api/v1/services/unpublished-draft-service');
      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/portfolio should return portfolio items with explicit isDemo flag', async () => {
      jest.spyOn(PortfolioProject, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockPortfolio)
      } as any);

      const res = await request(app).get('/api/v1/portfolio');
      expect(res.status).toBe(200);
      expect(res.body.projects[0].isDemo).toBe(true);
      expect(res.body.projects[0].title).toContain('Pali Marble');
    });

    it('GET /api/v1/pricing should return active packages', async () => {
      jest.spyOn(PricingPackage, 'find').mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockPricing)
      } as any);

      const res = await request(app).get('/api/v1/pricing');
      expect(res.status).toBe(200);
      expect(res.body.packages[0].startingPrice).toBe(2999);
    });

    it('GET /api/v1/settings/public should return public settings without exposing private credentials', async () => {
      jest.spyOn(SiteSetting, 'find').mockReturnValue({
        lean: jest.fn().mockResolvedValue([
          { key: 'brandName', value: 'JEET Computer Education', isPublic: true },
          { key: 'contactPhone', value: '7413919688', isPublic: true }
        ])
      } as any);

      const res = await request(app).get('/api/v1/settings/public');
      expect(res.status).toBe(200);
      expect(res.body.settings.brandName).toBe('JEET Computer Education');
      expect(res.body.settings.contactPhone).toBe('7413919688');
      expect(res.body.settings.JWT_SECRET).toBeUndefined();
      expect(res.body.settings.SMTP_PASS).toBeUndefined();
    });
  });

  describe('3. Enquiry Submission & Validation', () => {
    it('POST /api/v1/enquiries should reject requests missing required fields with 400', async () => {
      const res = await request(app).post('/api/v1/enquiries').send({
        fullName: 'R', // too short (< 2 chars)
        email: 'bad-email-format',
        mobile: '123' // too short (< 10 digits)
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.errors).toBeDefined();
    });

    it('POST /api/v1/enquiries should accept valid submission and generate unique reference number', async () => {
      jest.spyOn(Enquiry, 'findOne').mockResolvedValue(null); // No recent duplicates
      jest.spyOn(Enquiry, 'create').mockImplementation((data: any) => {
        const item = { ...data, _id: 'enq-123' };
        mockEnquiries.push(item);
        return Promise.resolve(item) as any;
      });

      const res = await request(app)
        .post('/api/v1/enquiries')
        .send({
          fullName: 'Vikram Singh',
          businessName: 'Marwar Handloom',
          email: 'vikram@marwarhandloom.com',
          mobile: '7413919688',
          city: 'Pali',
          websiteType: 'E-commerce Websites',
          preference: 'Dynamic Website',
          projectDescription: 'We need an e-commerce platform with UPI payment integration to sell textiles across India.',
          consentPrivacyPolicy: true
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.refNumber).toMatch(/^JEET-\d{8}-\d{4}$/);
      expect(res.body.whatsappFollowupUrl).toContain('wa.me/917413919688');
    });

    it('POST /api/v1/enquiries duplicate submission protection should return 429', async () => {
      // Mock existing recent enquiry found within 5 minutes
      jest.spyOn(Enquiry, 'findOne').mockResolvedValue({ _id: 'existing-123' } as any);

      const res = await request(app)
        .post('/api/v1/enquiries')
        .send({
          fullName: 'Vikram Singh',
          email: 'vikram@marwarhandloom.com',
          mobile: '7413919688',
          city: 'Pali',
          websiteType: 'E-commerce Websites',
          projectDescription: 'Duplicate submission attempt within 5 minutes.',
          consentPrivacyPolicy: true
        });

      expect(res.status).toBe(429);
      expect(res.body.message).toContain('already received');
    });
  });

  describe('4. Admin Authentication & Role Authorization', () => {
    it('POST /api/v1/admin/auth/login with wrong credentials should return 401', async () => {
      jest.spyOn(AdminUser, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(null)
      } as any);

      const res = await request(app).post('/api/v1/admin/auth/login').send({
        usernameOrEmail: 'unknownadmin',
        password: 'RandomPassword123!'
      });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('POST /api/v1/admin/auth/login with valid credentials returns JWT token and never leaks passwordHash', async () => {
      jest.spyOn(AdminUser, 'findOne').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockAdmin)
      } as any);

      const res = await request(app).post('/api/v1/admin/auth/login').send({
        usernameOrEmail: 'testadmin',
        password: 'JeetSecure123!'
      });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user.username).toBe('testadmin');
      expect(res.body.user.passwordHash).toBeUndefined();
    });

    it('Protected Admin routes should return 401 if unauthenticated', async () => {
      const res = await request(app).get('/api/v1/admin/dashboard');
      expect(res.status).toBe(401);
      expect(res.body.message).toContain('Authentication required');
    });

    it('Protected Admin routes with valid JWT Bearer header should succeed', async () => {
      const token = jwt.sign(
        { id: mockAdmin._id, role: mockAdmin.role },
        process.env.JWT_SECRET || 'jeet_secret_jwt_key_2026_production_fallback',
        { expiresIn: '1h' }
      );

      jest.spyOn(AdminUser, 'findById').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockAdmin)
      } as any);

      jest.spyOn(Enquiry, 'countDocuments').mockResolvedValue(5);
      jest.spyOn(PortfolioProject, 'countDocuments').mockResolvedValue(4);
      jest.spyOn(BlogPost, 'countDocuments').mockResolvedValue(2);
      jest.spyOn(Service, 'countDocuments').mockResolvedValue(6);
      jest.spyOn(Enquiry, 'find').mockReturnValue({
        sort: jest.fn().mockReturnValue({
          limit: jest.fn().mockReturnValue({
            lean: jest.fn().mockResolvedValue([])
          })
        })
      } as any);
      jest.spyOn(Enquiry, 'aggregate').mockResolvedValue([{ _id: 'New', count: 3 }]);

      const res = await request(app)
        .get('/api/v1/admin/dashboard')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.stats.totalEnquiries).toBe(5);
    });
  });

  describe('5. Admin Enquiry CRM & CSV Export', () => {
    const token = jwt.sign(
      { id: mockAdmin._id, role: mockAdmin.role },
      process.env.JWT_SECRET || 'jeet_secret_jwt_key_2026_production_fallback',
      { expiresIn: '1h' }
    );

    it('Admin can update enquiry status, quotation amount, and append internal notes', async () => {
      jest.spyOn(AdminUser, 'findById').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockAdmin)
      } as any);

      const fakeEnquiry = {
        _id: '507f1f77bcf86cd799439099',
        refNumber: 'JEET-20261015-8492',
        fullName: 'Vikram Singh',
        status: 'New',
        internalNotes: [] as any[],
        save: jest.fn().mockResolvedValue(true)
      };

      jest.spyOn(Enquiry, 'findById').mockResolvedValue(fakeEnquiry as any);

      const res = await request(app)
        .patch('/api/v1/admin/enquiries/507f1f77bcf86cd799439099')
        .set('Authorization', `Bearer ${token}`)
        .send({
          status: 'Quotation Sent',
          quoteAmount: 18500,
          internalNote: 'Discussed requirements. Sent milestone proposal for 18,500.'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(fakeEnquiry.status).toBe('Quotation Sent');
      expect(fakeEnquiry.internalNotes.length).toBe(1);
      expect(fakeEnquiry.internalNotes[0].note).toContain('18,500');
    });

    it('GET /api/v1/admin/enquiries/export generates downloadable CSV with proper headers', async () => {
      jest.spyOn(AdminUser, 'findById').mockReturnValue({
        select: jest.fn().mockResolvedValue(mockAdmin)
      } as any);

      jest.spyOn(Enquiry, 'find').mockReturnValue({
        sort: jest.fn().mockReturnValue({
          lean: jest.fn().mockResolvedValue([
            {
              refNumber: 'JEET-20261015-8492',
              createdAt: new Date(),
              fullName: 'Vikram Singh',
              businessName: 'Marwar Handloom',
              email: 'vikram@example.com',
              mobile: '7413919688',
              city: 'Pali',
              websiteType: 'E-commerce Websites',
              preference: 'Dynamic Website',
              status: 'Approved',
              quoteAmount: 18500
            }
          ])
        })
      } as any);

      const res = await request(app)
        .get('/api/v1/admin/enquiries/export')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toContain('text/csv');
      expect(res.text).toContain('Ref Number');
      expect(res.text).toContain('Marwar Handloom');
    });

    it('Public requests have ZERO access to private CRM records', async () => {
      // Public route router doesn't even expose GET /enquiries
      const res = await request(app).get('/api/v1/enquiries');
      expect(res.status).toBe(404);
    });
  });
});
