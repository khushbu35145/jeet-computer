import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../config/db';
import { Service } from '../models/Service';
import { PricingPackage } from '../models/PricingPackage';
import { PortfolioProject } from '../models/PortfolioProject';
import { FAQ } from '../models/FAQ';
import { SiteSetting } from '../models/SiteSetting';
import { BlogPost } from '../models/BlogPost';

const servicesData = [
  {
    title: 'Static Website Development',
    slug: 'static-website-development',
    tagline: 'Blazing-fast, secure, and budget-friendly websites for startups and small businesses.',
    overview: 'Ideal for small businesses, retail shops, professionals, and consultants who need a fast, elegant, and low-maintenance web presence. Static websites load instantly, have zero database vulnerabilities, and provide unmatched reliability.',
    suitableCustomers: ['Small Retailers', 'Consultants & Freelancers', 'Doctors & CA Professionals', 'Local Service Providers'],
    features: [
      'Ultra-fast load times (< 1 second)',
      '100% Mobile & Tablet responsive design',
      'Free SSL Certificate & Hosting setup assistance',
      'Contact form with direct WhatsApp click-to-chat integration',
      'Basic On-Page SEO optimization & Google Maps integration',
      'Zero database maintenance or security patching required'
    ],
    developmentOptions: ['HTML5 + Modern CSS + JavaScript', 'React Static Export / Vite', 'Astro / Next.js Static'],
    benefits: ['Extremely cost-effective starting at ₹2,999', 'Nearly impossible to hack', 'Near-zero ongoing hosting overhead'],
    faqs: [
      {
        question: 'What is a static website?',
        answer: 'A static website delivers pre-built web pages directly to the user browser. It is lightning-fast, ultra-secure, and does not require a database for everyday viewing.'
      },
      {
        question: 'Can I add new text or photos later?',
        answer: 'Yes! We provide easy content maintenance support, or you can upgrade to a dynamic CMS website whenever your business grows.'
      }
    ],
    iconName: 'Layout',
    badge: 'Budget Friendly',
    order: 1,
    isPublished: true,
    metaTitle: 'Static Website Development Services in Pali | JEET Computer Education',
    metaDescription: 'Affordable, high-speed static websites starting at ₹2,999 for local businesses in Pali, Rajasthan. Modern design and WhatsApp integration included.'
  },
  {
    title: 'Dynamic Website Development',
    slug: 'dynamic-website-development',
    tagline: 'Feature-rich web applications with secure admin panels and database management.',
    overview: 'Engineered for growing businesses that require regular content updates, product catalogs, customer inquiry management, interactive forms, and dynamic data storage. Powered by modern MERN stack technology.',
    suitableCustomers: ['Growing Companies', 'Trading & Distribution Firms', 'Agencies & Service Providers', 'Event Organizers'],
    features: [
      'Interactive Custom Admin Dashboard',
      'Real-time database integration (MongoDB / PostgreSQL)',
      'Unlimited pages, blogs, and product/service management',
      'Lead management CRM with status workflows',
      'Role-based staff and admin authentication',
      'Automated email and SMS/WhatsApp notifications'
    ],
    developmentOptions: ['MERN Stack (MongoDB, Express, React, Node.js)', 'Next.js Full Stack', 'Headless CMS + React'],
    benefits: ['Full control over your content without coding', 'Scalable architecture that grows with your business', 'Centralized customer inquiry capture'],
    faqs: [
      {
        question: 'Do I need technical skills to update content?',
        answer: 'Not at all. We build intuitive, simple admin dashboards where you can upload images, update prices, and edit text with a few clicks.'
      }
    ],
    iconName: 'Database',
    badge: 'Most Popular',
    order: 2,
    isPublished: true,
    metaTitle: 'Dynamic Website & Web App Development | JEET Computer Education',
    metaDescription: 'Custom dynamic websites with custom admin panels, database management, and CRM integrations built by JEET Computer Education.'
  },
  {
    title: 'Business and Corporate Websites',
    slug: 'business-website-development',
    tagline: 'Authoritative, lead-generating digital headquarters for established enterprises.',
    overview: 'Establish unmatched credibility, showcase your company capabilities, capture corporate inquiries, and outshine competitors with an executive-grade corporate web platform.',
    suitableCustomers: ['Manufacturing & Industrial Units', 'Export-Import Firms', 'Corporate Offices & Law Firms', 'Healthcare Facilities'],
    features: [
      'Corporate brand identity & custom typography',
      'Multi-department directory & career inquiry portal',
      'Corporate brochure & catalog download gate',
      'Interactive RFQ (Request for Quote) system',
      'Enterprise security & performance optimization'
    ],
    developmentOptions: ['Custom React + Node.js Enterprise Architecture', 'Modern SSR Systems'],
    benefits: ['Win high-value client contracts', 'Establish professional corporate stature', 'Streamline B2B client inquiries'],
    faqs: [
      {
        question: 'Can we integrate our company email and GST details?',
        answer: 'Yes! We configure professional domain emails (e.g., info@yourcompany.com) and display official regulatory credentials prominently.'
      }
    ],
    iconName: 'Building2',
    badge: 'Enterprise',
    order: 3,
    isPublished: true,
    metaTitle: 'Corporate & Business Website Development | JEET Computer Education',
    metaDescription: 'Professional corporate website development for enterprises, industries, and businesses in Rajasthan.'
  },
  {
    title: 'E-commerce Websites',
    slug: 'ecommerce-website-development',
    tagline: 'Complete online stores with payment gateways, order management, and inventory.',
    overview: 'Transform your retail store or wholesale venture into a 24/7 selling machine. Accept payments via UPI, Credit/Debit cards, NetBanking, and manage orders with real-time inventory controls.',
    suitableCustomers: ['Retail Shops & Boutiques', 'Handicrafts & Textile Traders', 'Jewelry & Fashion Brands', 'Kirana & Grocery Chains'],
    features: [
      'Product catalog with unlimited variants (size, color, weight)',
      'Indian Payment Gateways (Razorpay, PhonePe, Cashfree, Paytm, UPI)',
      'Shopping cart, wishlist, and single-click checkout',
      'Order fulfillment, customer invoice generation & tracking',
      'Coupon codes, discounts, and promotional banners'
    ],
    developmentOptions: ['Custom MERN Stack E-commerce', 'Next.js Commerce with Headless API'],
    benefits: ['Sell across all India directly to customers', '0% marketplace commissions to middlemen', 'Direct client phone and WhatsApp connections'],
    faqs: [
      {
        question: 'Which payment gateways can be integrated?',
        answer: 'We integrate all major Indian payment processors including Razorpay, Cashfree, PhonePe, and instant UPI QR payments.'
      }
    ],
    iconName: 'ShoppingBag',
    badge: 'High ROI',
    order: 4,
    isPublished: true,
    metaTitle: 'E-commerce Website Development with UPI & Payment Gateway | JEET',
    metaDescription: 'Launch your online store with UPI, Razorpay, inventory tracking, and mobile-friendly shopping carts.'
  },
  {
    title: 'School, College and Coaching Institute Websites',
    slug: 'education-website-development',
    tagline: 'Dedicated academic portals for admissions, course syllabus, and student notices.',
    overview: 'As an educational institute ourselves, JEET Computer Education intimately understands the unique digital needs of schools, colleges, competitive coaching centers, and training institutes.',
    suitableCustomers: ['CBSE / RBSE Schools', 'Degree & Polytechnic Colleges', 'Coaching Institutes (IIT/NEET/Govt Exams)', 'Skill Training Academies'],
    features: [
      'Online student admission & registration enquiry forms',
      'Digital notice board & exam result announcements',
      'Faculty profiles & department portfolios',
      'Course curriculum, fee structure & downloadable syllabus',
      'Photo & video event gallery with cultural highlights'
    ],
    developmentOptions: ['MERN Education Portal', 'Modular Campus CMS'],
    benefits: ['Boost student admissions each academic session', 'Keep parents and students informed 24/7', 'Paperless inquiry management'],
    faqs: [
      {
        question: 'Can parents pay admission fees online?',
        answer: 'Yes, we can integrate instant online payment modules for admission forms and term fees.'
      }
    ],
    iconName: 'GraduationCap',
    badge: 'Specialized',
    order: 5,
    isPublished: true,
    metaTitle: 'School, College & Coaching Website Development | JEET Computer Education',
    metaDescription: 'Specialized educational website development for schools, colleges, and coaching institutes across Pali & Rajasthan.'
  },
  {
    title: 'Custom Web Applications',
    slug: 'custom-web-applications',
    tagline: 'Tailor-made software solutions to automate your unique business workflows.',
    overview: 'When off-the-shelf software falls short, we engineer bespoke web applications that match your exact operational rules, role hierarchies, and reporting needs.',
    suitableCustomers: ['Logistics & Warehousing', 'Healthcare & Clinics', 'Custom Manufacturing', 'Multi-branch Enterprises'],
    features: [
      'Custom database architecture engineered for scale',
      'Role-based access control (Admin, Manager, Staff, Customer)',
      'Automated PDF generation, reporting, and Excel exports',
      'Real-time status tracking & workflow automation',
      'Cloud deployment with automated backups'
    ],
    developmentOptions: ['Full-stack MERN (Node, Express, MongoDB, React, TypeScript)', 'RESTful Microservices'],
    benefits: ['Eliminate repetitive manual Excel spreadsheets', 'Increase operational efficiency by 40%', 'Complete intellectual property ownership'],
    faqs: [
      {
        question: 'How do you price custom web applications?',
        answer: 'Custom web apps are scoped based on specific user stories, workflows, and integrations. We provide an itemized milestone quotation after requirement discussion.'
      }
    ],
    iconName: 'Code',
    badge: 'Bespoke',
    order: 6,
    isPublished: true,
    metaTitle: 'Custom Web Application Development | JEET Computer Education',
    metaDescription: 'Tailored MERN stack web applications and management systems built to your business specifications.'
  }
];

const pricingData = [
  {
    title: 'Basic Static Website',
    slug: 'basic-static-website',
    startingPrice: 2999,
    priceNote: 'Provisional starting price for up to 3 pages. Final cost depends on specific page count and assets provided.',
    isCustomQuote: false,
    deliveryTimeEstimate: '3 - 5 Working Days',
    tagline: 'Perfect for small local shops, service professionals, and individuals starting out.',
    featuresIncluded: [
      'Up to 3-5 clean, mobile-responsive pages',
      'Home, About, Services, Contact & Location',
      'Direct WhatsApp click-to-chat integration',
      'Google Maps location embed',
      'Basic On-Page SEO meta setup',
      '1 Year standard deployment assistance',
      'Fast loading speed & mobile optimization'
    ],
    exclusions: [
      'Custom admin dashboard / CMS',
      'Dynamic database functionality',
      'Online payment gateway integration',
      'Domain registration and third-party hosting fees (billed directly at actuals)'
    ],
    isRecommended: false,
    isActive: true,
    order: 1,
    badge: 'Starter'
  },
  {
    title: 'Professional Business Website',
    slug: 'professional-business-website',
    startingPrice: 5999,
    priceNote: 'Provisional starting price for standard 5-8 page corporate presence.',
    isCustomQuote: false,
    deliveryTimeEstimate: '5 - 8 Working Days',
    tagline: 'Ideal for established businesses, traders, and firms seeking qualified online leads.',
    featuresIncluded: [
      'Up to 8-10 customized high-impact pages',
      'Modern, branded UI/UX with smooth animations',
      'Interactive lead enquiry forms with email alerts',
      'Product / Service showcase catalog',
      'Customer testimonials and photo gallery',
      'Advanced On-Page SEO & Google Search Console setup',
      'Social media integration & WhatsApp widget',
      '1 Month complimentary post-launch support'
    ],
    exclusions: [
      'E-commerce shopping cart & checkout',
      'Paid third-party API subscriptions (SMS, WhatsApp Business API)',
      'Domain & cloud hosting renewal fees after year 1'
    ],
    isRecommended: true,
    isActive: true,
    order: 2,
    badge: 'Most Popular'
  },
  {
    title: 'Dynamic Website with Admin Panel',
    slug: 'dynamic-website-admin-panel',
    startingPrice: 12999,
    priceNote: 'Provisional starting price. Includes custom admin panel and MongoDB database.',
    isCustomQuote: false,
    deliveryTimeEstimate: '10 - 15 Working Days',
    tagline: 'Complete self-managed web solution with full database control and lead CRM.',
    featuresIncluded: [
      'Unlimited dynamic pages, posts, and services',
      'Secure password-protected Admin Dashboard',
      'Manage services, products, FAQs & customer reviews',
      'Lead management CRM with status updates & CSV export',
      'MongoDB database integration',
      'Role-based admin access & activity audit logging',
      'Rich text editor for articles & updates',
      'Automated customer and admin email notifications',
      '3 Months complimentary priority maintenance'
    ],
    exclusions: [
      'Multi-vendor marketplace infrastructure',
      'Dedicated third-party payment gateway merchant account setup fees'
    ],
    isRecommended: false,
    isActive: true,
    order: 3,
    badge: 'Full Control'
  },
  {
    title: 'E-commerce Website',
    slug: 'ecommerce-website',
    startingPrice: 19999,
    priceNote: 'Provisional starting price. Covers product catalog, cart, and payment gateway integration.',
    isCustomQuote: false,
    deliveryTimeEstimate: '15 - 22 Working Days',
    tagline: 'Full-featured online store to sell your products and accept payments nationwide.',
    featuresIncluded: [
      'Product management with variants (size, color, stock)',
      'Indian payment gateway (Razorpay/UPI/Cards/Netbanking)',
      'Shopping cart & streamlined mobile checkout',
      'Order tracking, customer dashboard & PDF invoices',
      'Coupon codes, discount banners & promotional popups',
      'Inventory stock level alerts',
      'WhatsApp order confirmation helper',
      'Comprehensive admin sales dashboard'
    ],
    exclusions: [
      'Payment gateway transaction fees (typically 1.8% - 2% charged by gateway provider)',
      'Logistics / Shipping API integration fees (Shiprocket / Delhivery billed separately at actuals)'
    ],
    isRecommended: false,
    isActive: true,
    order: 4,
    badge: 'Sell Online'
  },
  {
    title: 'Custom Web Application',
    slug: 'custom-web-application',
    startingPrice: 29999,
    priceNote: 'Custom quotation based on detailed scope of work and functional specifications.',
    isCustomQuote: true,
    deliveryTimeEstimate: '3 - 6 Weeks (Milestone based)',
    tagline: 'Tailored enterprise software, portals, ERP modules, and bespoke management systems.',
    featuresIncluded: [
      'Custom full-stack MERN architecture engineered to spec',
      'Multi-role permissions (Superadmin, Branch Manager, Staff, Client)',
      'Complex business logic, calculations, and reporting',
      'Automated background tasks, jobs, and cron schedules',
      'Third-party API integrations & webhooks',
      'High-security headers, encryption, and audit logs',
      'Automated unit & integration test coverage',
      'Dedicated staging server & thorough user training'
    ],
    exclusions: [
      'Custom quotation tailored to exact system architecture document'
    ],
    isRecommended: false,
    isActive: true,
    order: 5,
    badge: 'Enterprise'
  }
];

const portfolioData = [
  {
    title: 'Pali Marble & Granite Exporters Hub',
    slug: 'pali-marble-granite-demo',
    category: 'Business and Corporate Websites',
    shortDescription: 'Interactive demonstration of an industrial export website with product catalog, stone texture viewer, and RFQ inquiry generator.',
    fullDescription: 'Designed specifically for the vibrant stone and mineral industry of Pali and Jodhpur. Features an immersive stone gallery, technical spec sheets, international export inquiry workflow, and mobile-optimized catalog downloads.',
    techStack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    features: ['Stone slab gallery with high-res zoom', 'Export Request-for-Quote (RFQ) form', 'WhatsApp quick pricing trigger', 'Multi-currency indicator demo'],
    demoUrl: 'https://demo-stone.jeeteducation.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80'
    ],
    isDemo: true,
    isPublished: true,
    order: 1,
    featured: true
  },
  {
    title: 'Shri Krishna Academy & Coaching Portal',
    slug: 'shri-krishna-academy-demo',
    category: 'School, College and Coaching Institute Websites',
    shortDescription: 'Demonstration education portal featuring online admissions, downloadable study material, faculty showcase, and dynamic notice board.',
    fullDescription: 'Tailored for coaching academies and private schools in Western Rajasthan. Streamlines parent inquiries, student registrations, exam schedules, and results publication.',
    techStack: ['React', 'Express', 'MongoDB', 'Tailwind CSS'],
    features: ['Online admission application', 'Interactive notice bulletin', 'Faculty directory', 'Course syllabus downloads'],
    demoUrl: 'https://demo-academy.jeeteducation.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
    ],
    isDemo: true,
    isPublished: true,
    order: 2,
    featured: true
  },
  {
    title: 'Marwar Handloom & Handicrafts Online Store',
    slug: 'marwar-handloom-ecommerce-demo',
    category: 'E-commerce Websites',
    shortDescription: 'Demonstration e-commerce store with mobile-first checkout, Razorpay/UPI payment simulations, and order tracking.',
    fullDescription: 'Showcases how traditional Rajasthani textile artisans, bandhej manufacturers, and boutique owners can sell sarees, dupattas, and handicrafts directly to pan-India buyers without 30% marketplace fees.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Razorpay SDK'],
    features: ['Filter by fabric, color, and price', 'UPI & Card instant payment checkout', 'Customer order history & invoice generation'],
    demoUrl: 'https://demo-handloom.jeeteducation.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80'
    ],
    isDemo: true,
    isPublished: true,
    order: 3,
    featured: true
  },
  {
    title: 'Rajasthan Heritage Resort & Dining Booking Hub',
    slug: 'rajasthan-heritage-resort-demo',
    category: 'Hotel and Restaurant Websites',
    shortDescription: 'Demonstration hospitality website with room availability check, banquet hall inquiry, and food menu showcase.',
    fullDescription: 'Crafted for heritage properties, resorts, and restaurants across Marwar. Includes high-resolution imagery, wedding lawn booking inquiries, and instant WhatsApp concierge.',
    techStack: ['React', 'Tailwind CSS', 'Vite', 'Express'],
    features: ['Room category visual explorer', 'Date-based availability inquiry', 'Wedding & Event planner lead wizard'],
    demoUrl: 'https://demo-resort.jeeteducation.com',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    ],
    isDemo: true,
    isPublished: true,
    order: 4,
    featured: false
  }
];

const faqsData = [
  {
    question: 'What is the main difference between a Static and a Dynamic website?',
    answer: 'A static website delivers fixed content directly to users—making it extremely fast, cost-effective, and virtually hack-proof, but requires a developer to make textual or photo changes. A dynamic website connects to a database and includes an intuitive Admin Dashboard, allowing you to create new pages, edit prices, upload photos, and manage client inquiries yourself anytime without technical knowledge.',
    category: 'General',
    order: 1,
    isPublished: true
  },
  {
    question: 'How long does it take to deliver our website?',
    answer: 'A Basic Static Website is typically ready within 3 to 5 working days. A Professional Business Website takes 5 to 8 working days. Dynamic websites and E-commerce stores typically take 10 to 20 working days depending on the volume of content and custom features required.',
    category: 'Process & Timelines',
    order: 2,
    isPublished: true
  },
  {
    question: 'Are domain name and hosting included in the package price?',
    answer: 'Our listed prices represent our transparent website design, development, and engineering fees. Domain registration (.com or .in) and hosting are billed at actual cost directly through top providers (Hostinger, Namecheap, AWS), ensuring that YOU own 100% of your digital assets. We handle the technical setup and DNS configuration completely free of charge.',
    category: 'Pricing & Domains',
    order: 3,
    isPublished: true
  },
  {
    question: 'Will our website work properly on mobile phones and tablets?',
    answer: 'Yes, 100%. Every single website we engineer is strictly mobile-first and fully responsive across smartphones, tablets, laptops, and wide desktop screens.',
    category: 'Technical',
    order: 4,
    isPublished: true
  },
  {
    question: 'Do you provide maintenance and updates after website launch?',
    answer: 'Yes! All packages include complimentary post-launch support (from 1 to 3 months depending on package). We also offer flexible Annual Maintenance Contracts (AMC) starting from just ₹2,500/year for regular backups, security patches, and content updates.',
    category: 'Support & AMC',
    order: 5,
    isPublished: true
  },
  {
    question: 'Can we visit your office in Pali to discuss our project in person?',
    answer: 'Absolutely! We welcome local business owners and entrepreneurs to visit JEET Computer Education in Pali, Rajasthan. You can also call us directly at 7413919688 or 8233316498 to schedule a consultation.',
    category: 'Contact & Location',
    order: 6,
    isPublished: true
  }
];

const blogsData = [
  {
    title: 'Static vs. Dynamic Websites: Which One Does Your Business Really Need?',
    slug: 'static-vs-dynamic-websites-guide',
    excerpt: 'Confused between choosing a static website or a dynamic web application? Learn the differences in cost, speed, security, and administrative control.',
    content: `
      <h2>Introduction</h2>
      <p>When planning to build an online presence for your business in Rajasthan or anywhere in India, one of the first technical decisions you encounter is whether to build a <strong>static website</strong> or a <strong>dynamic website</strong>.</p>
      
      <h2>What is a Static Website?</h2>
      <p>A static website consists of web pages that display fixed content to all visitors. The pages are pre-built using HTML5, modern CSS, and JavaScript.</p>
      <ul>
        <li><strong>Super Fast Speed:</strong> Because there is no database processing on each visit, pages load almost instantaneously.</li>
        <li><strong>Maximum Security:</strong> With no database or server-side scripting running behind it, static sites are practically impervious to SQL injection or CMS plugin exploits.</li>
        <li><strong>Low Cost:</strong> Development starts at just ₹2,999, with minimal hosting overhead.</li>
      </ul>

      <h2>What is a Dynamic Website?</h2>
      <p>A dynamic website is powered by a backend database (such as MongoDB or MySQL) and a content management system (CMS) or custom admin dashboard.</p>
      <ul>
        <li><strong>Administrative Freedom:</strong> You can add new blog posts, change product prices, and upload festival greetings anytime from your mobile or PC without touching code.</li>
        <li><strong>Customer Interactions:</strong> Supports user accounts, product catalogs, shopping carts, and dynamic inquiry filters.</li>
      </ul>

      <h2>Which One Should You Choose?</h2>
      <p>If you run a local service business, law office, or clinic and simply need a trustworthy digital visiting card that captures WhatsApp inquiries, a <strong>Static Website</strong> is the most cost-effective choice. If you manage an institute, trading firm, or store that updates offerings regularly, invest in a <strong>Dynamic Website</strong>.</p>
    `,
    category: 'Web Architecture',
    tags: ['Static Website', 'Dynamic Website', 'MERN Stack', 'Web Development'],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    author: 'JEET Technical Team',
    isPublished: true,
    publishedAt: new Date(),
    readTimeMinutes: 5,
    metaTitle: 'Static vs Dynamic Websites Guide 2026 | JEET Computer Education',
    metaDescription: 'Complete guide comparing static vs dynamic websites for small and medium businesses.'
  },
  {
    title: 'Why Every Local Business in Pali & Rajasthan Needs a Professional Website in 2026',
    slug: 'why-local-business-needs-website-2026',
    excerpt: 'Word-of-mouth is great, but 84% of consumers now check Google before visiting a shop. Discover why a professional website is your #1 growth lever.',
    content: `
      <h2>The Shift to Digital Search</h2>
      <p>Gone are the days when a storefront sign and word-of-mouth alone could sustain a thriving business in Pali, Jodhpur, or Sumerpur. Today, customers search on their mobile phones: <em>"Best marble supplier in Pali"</em>, <em>"Coaching institute near me"</em>, or <em>"Handloom wholesale shop"</em>.</p>

      <h2>Top 4 Reasons to Build Your Website Now</h2>
      <ol>
        <li><strong>Instant Trust & Credibility:</strong> A business with an official website immediately commands greater trust than one relying solely on an unverified social media page.</li>
        <li><strong>24/7 Lead Generation:</strong> Even when your physical shutter is down at night, your website continues to answer customer questions and capture project inquiries.</li>
        <li><strong>Direct WhatsApp Inquiries:</strong> Integrating click-to-chat enables prospective customers to connect with you in one tap.</li>
        <li><strong>Expand Beyond Your City:</strong> A website allows local manufacturers and traders to receive export and wholesale inquiries from Delhi, Mumbai, Gujarat, and abroad.</li>
      </ol>
    `,
    category: 'Business Growth',
    tags: ['Local SEO', 'Business Growth', 'Pali Rajasthan', 'Digital Presence'],
    featuredImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80',
    author: 'JEET Technical Team',
    isPublished: true,
    publishedAt: new Date(),
    readTimeMinutes: 4,
    metaTitle: 'Why Local Businesses Need a Website in 2026 | JEET Pali',
    metaDescription: 'Discover why professional web development is essential for local businesses in Pali, Rajasthan.'
  }
];

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to database...');
    await connectDB();

    console.log('[Seed] Clearing existing catalogs and settings...');
    await Promise.all([
      Service.deleteMany({}),
      PricingPackage.deleteMany({}),
      PortfolioProject.deleteMany({}),
      FAQ.deleteMany({}),
      BlogPost.deleteMany({})
    ]);

    console.log('[Seed] Inserting Services...');
    await Service.insertMany(servicesData);

    console.log('[Seed] Inserting Pricing Packages...');
    await PricingPackage.insertMany(pricingData);

    console.log('[Seed] Inserting Portfolio Demos...');
    await PortfolioProject.insertMany(portfolioData);

    console.log('[Seed] Inserting FAQs...');
    await FAQ.insertMany(faqsData);

    console.log('[Seed] Inserting Blog Posts...');
    await BlogPost.insertMany(blogsData);

    console.log('[Seed] Initializing default Site Settings...');
    const defaultSettings = [
      { key: 'brandName', value: 'JEET Computer Education', category: 'general', isPublic: true },
      { key: 'tagline', value: 'We Build Websites That Build Your Business', category: 'general', isPublic: true },
      { key: 'contactPhone', value: '7413919688', category: 'contact', isPublic: true },
      { key: 'contactPhoneAlt', value: '8233316498', category: 'contact', isPublic: true },
      { key: 'whatsappNumber', value: '917413919688', category: 'contact', isPublic: true },
      { key: 'contactEmail', value: 'info@jeeteducation.com', category: 'contact', isPublic: true },
      { key: 'officeAddress', value: 'JEET Computer Education, Near Railway Station / Main Bus Stand, Pali, Rajasthan, 306401, India', category: 'contact', isPublic: true },
      { key: 'defaultCtaText', value: 'Get a Free Quote', category: 'appearance', isPublic: true },
      { key: 'maintenanceMode', value: false, category: 'system', isPublic: true }
    ];

    for (const st of defaultSettings) {
      await SiteSetting.findOneAndUpdate({ key: st.key }, st, { upsert: true });
    }

    console.log('✅ [Seed Completed Successfully!] Database has been populated with high-quality initial services, portfolio demos, pricing tiers, FAQs, blogs, and settings.');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed Error]', (error as Error).message);
    process.exit(1);
  }
};

seedDatabase();
