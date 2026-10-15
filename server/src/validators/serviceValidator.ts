import { z } from 'zod';

export const serviceSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(120),
    slug: z.string().min(3).max(120),
    tagline: z.string().min(5).max(250),
    overview: z.string().min(20),
    suitableCustomers: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    developmentOptions: z.array(z.string()).default([]),
    benefits: z.array(z.string()).default([]),
    faqs: z
      .array(
        z.object({
          question: z.string().min(3),
          answer: z.string().min(5)
        })
      )
      .default([]),
    iconName: z.string().default('Globe'),
    badge: z.string().optional(),
    order: z.number().default(0),
    isPublished: z.boolean().default(true),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ctaText: z.string().default('Get a Free Quote')
  })
});
