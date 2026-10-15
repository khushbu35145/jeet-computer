import { z } from 'zod';

export const portfolioProjectSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(120),
    slug: z.string().min(3).max(120),
    category: z.string().min(2),
    shortDescription: z.string().min(10).max(300),
    fullDescription: z.string().min(20),
    techStack: z.array(z.string()).default([]),
    features: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional().or(z.literal('')),
    demoUrl: z.string().url().optional().or(z.literal('')),
    thumbnailUrl: z.string().min(1, 'Thumbnail is required'),
    galleryImages: z.array(z.string()).default([]),
    isDemo: z.boolean().default(true),
    isPublished: z.boolean().default(true),
    order: z.number().default(0),
    featured: z.boolean().default(false)
  })
});
