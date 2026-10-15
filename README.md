# JEET Computer Education — Website Development Services Platform

> **A production-ready MERN stack web application engineered for JEET Computer Education (Pali, Rajasthan, India) to promote and manage professional website development services for businesses, startups, individuals, and educational institutions.**

---

## 🌟 Executive Overview

**JEET Computer Education** delivers end-to-end web engineering, from ultra-fast static websites starting at ₹2,999 to enterprise-grade dynamic MERN applications with custom Admin Dashboards and automated lead capture.

### Key Capabilities & Architecture
- **Frontend:** React 19 + Vite 8 + TypeScript + Tailwind CSS v4 + React Router + Lucide React.
- **Backend:** Node.js + Express.js REST API (`/api/v1`) with structured layered architecture.
- **Database:** MongoDB with Mongoose ODM, strict schema validation, indexes, and timestamps.
- **Security Engineering:** Helmet security headers, rate limiting (general, strict auth, anti-spam enquiries), CORS whitelisting, HTTP-only secure cookie JWT authentication, bcrypt salted hashing (factor 12), and parameter-safe query sanitization.
- **Admin Dashboard:** Password-protected management portal (`/admin/login`) with metrics, Enquiry CRM, service catalog CRUD, portfolio demo management, pricing package controls, rich blog publishing, testimonial moderation, and website settings.
- **Integrations:** Direct WhatsApp click-to-chat with pre-filled reference numbers, Nodemailer SMTP notification service with graceful fallback.

---

## 📁 Repository Structure

```
jeetcomputereducation/
├── client/                      # Frontend React + Vite + TypeScript Application
│   ├── public/                  # Static assets (robots.txt, sitemap.xml, favicon)
│   ├── src/
│   │   ├── admin/               # Admin Portal (Auth Context, Layout, CRM, CRUD Pages)
│   │   ├── components/public/   # Public Components (Navbar, Footer, WhatsApp Button)
│   │   ├── pages/public/        # Public Pages (Home, Services, Portfolio, Pricing, Quote)
│   │   ├── services/            # API client service with token management
│   │   ├── types/               # Strict TypeScript interface declarations
│   │   ├── App.tsx              # Application routing table
│   │   ├── index.css            # Tailwind CSS v4 design system
│   │   └── main.tsx             # React entry point
│   ├── .env.example             # Frontend environment variables template
│   ├── package.json
│   └── vite.config.ts           # Vite + Tailwind plugin + API reverse proxy
│
├── server/                      # Production Express.js REST API
│   ├── src/
│   │   ├── config/              # Database connection, application constants
│   │   ├── controllers/         # REST API business logic controllers
│   │   ├── middleware/          # JWT auth, error handling, rate limiting, upload, validate
│   │   ├── models/              # Mongoose database models (AdminUser, Enquiry, Service, etc.)
│   │   ├── routes/              # Public & Admin route declarations
│   │   ├── scripts/             # Database seed and first-admin provisioning CLI scripts
│   │   ├── services/            # Email notification & administrative audit services
│   │   ├── validators/          # Zod schema request validators
│   │   ├── app.ts               # Express configuration with middleware pipeline
│   │   └── server.ts            # Server listener with process handlers
│   ├── tests/                   # Automated integration test suite (18 test cases)
│   ├── uploads/                 # Secure file uploads directory
│   ├── .env.example             # Server environment variables template
│   ├── jest.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore                   # Multi-stage security ignore file
└── README.md                    # Complete operations and deployment guide
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js:** v18+ or v20+ or v24+ (`node -v`)
- **npm:** v9+ or v11+ (`npm -v`)
- **MongoDB:** Local MongoDB instance running on `mongodb://127.0.0.1:27017` OR a free cloud connection string from [MongoDB Atlas](https://www.mongodb.com/atlas).

---

### 2. Installation

Clone or open the workspace and install dependencies for both workspaces:

```bash
# 1. Install client dependencies
cd client
npm install
cd ..

# 2. Install server dependencies
cd server
npm install
cd ..
```

---

### 3. Environment Configuration

Copy the example configuration files and customize your values:

```bash
# In server directory
cp server/.env.example server/.env

# In client directory
cp client/.env.example client/.env
```

#### Key Server Variables (`server/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/jeet_web_solutions
JWT_SECRET=replace_with_a_secure_random_64_character_string_for_production
CLIENT_URL=http://localhost:5173
BRAND_NAME="JEET Computer Education"
CONTACT_PHONE=7413919688
CONTACT_PHONE_ALT=8233316498
WHATSAPP_NUMBER=917413919688
CONTACT_EMAIL=info@jeeteducation.com
ADMIN_NOTIFICATION_EMAIL=info@jeeteducation.com
```

---

### 4. Database Seeding & First Admin Provisioning

Populate the initial catalog of 17 service offerings, pricing tiers, portfolio demos, FAQs, and site settings:

```bash
npm --prefix server run seed
```

**Provision your First Administrator Account (CLI):**

```bash
npm --prefix server run create-admin
```
*(Default CLI initialization sets username `jeetadmin` with the configured password. Never commit passwords to Git).*

---

### 5. Running in Development

Run both the React frontend and Express backend concurrently:

```bash
# In terminal 1: Start Backend API
cd server
npm run dev

# In terminal 2: Start Frontend Application
cd client
npm run dev
```

- Public Platform: **[http://localhost:5173](http://localhost:5173)**
- Admin Login Portal: **[http://localhost:5173/admin/login](http://localhost:5173/admin/login)**
- API Health Status: **[http://localhost:5000/health](http://localhost:5000/health)**
- REST API Root: **[http://localhost:5000/api/v1](http://localhost:5000/api/v1)**

---

## 🧪 Automated Testing

Run the automated integration test suite to verify public APIs, security headers, input validation, authentication guards, and CRM pipelines:

```bash
npm --prefix server test
```

### Verified Test Matrix (18 Tests Passed):
1. `GET /health` service health check returns 200.
2. Helmet security headers verified.
3. Catch-all 404 handler returns structured JSON.
4. `GET /api/v1/services` returns only published services (drafts excluded).
5. `GET /api/v1/services/:slug` returns 404 for draft items.
6. `GET /api/v1/portfolio` verifies interactive demonstration flags.
7. `GET /api/v1/pricing` verifies active package prices.
8. `GET /api/v1/settings/public` verifies sensitive credentials remain unexposed.
9. `POST /api/v1/enquiries` validates required fields and regex patterns.
10. `POST /api/v1/enquiries` generates unique reference numbers (`JEET-YYYYMMDD-XXXX`).
11. `POST /api/v1/enquiries` enforces duplicate submission protection within 5 minutes.
12. Admin login rejects invalid passwords with 401.
13. Admin login returns JWT and hides password hashes.
14. Protected admin routes reject unauthenticated requests with 401.
15. Protected admin routes succeed with valid JWT Bearer tokens.
16. Admin CRM updates status, quotation amount, and internal notes.
17. CSV exporter formats authorized client records.
18. Public routes have zero access to private CRM records.

---

## 🛠 Production Build & Deployment

### Production Bundling
```bash
# Build frontend
cd client
npm run build
cd ..

# Build backend
cd server
npm run build
cd ..
```

### Deployment Options
1. **VPS / Cloud Server (Ubuntu / Debian / AlmaLinux):**
   - Install Node.js v20+ and PM2 (`npm install -g pm2`).
   - Use Nginx as a reverse proxy for SSL termination and static caching.
   - Start backend: `pm2 start dist/server.js --name "jeet-api"`.
   - Serve client build `client/dist` via Nginx or static host.
2. **Platform as a Service (Render / Railway / DigitalOcean App Platform):**
   - Connect repository branch.
   - Set Build Command: `npm --prefix server install && npm --prefix server run build`.
   - Set Start Command: `node server/dist/server.js`.
   - Configure Environment Variables in provider dashboard.

---

## 📞 Support & Contacts

**JEET Computer Education**  
📍 Near Railway Station / Main Bus Stand, Pali, Rajasthan, 306401, India  
📞 Phone: **7413919688** / **8233316498**  
💬 WhatsApp: **+91 7413919688**  
🌐 Website: [https://jeeteducation.com](https://jeeteducation.com)  
✉️ Email: [info@jeeteducation.com](mailto:info@jeeteducation.com)
