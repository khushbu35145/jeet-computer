import { z } from 'zod';

export const blogPostSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(150),
    slug: z.string().min(3).max(150),
    excerpt: z.string().min(10).max(350),
    content: z.string().min(30),
    category: z.string().min(2),
    tags: z.array(z.string()).default([]),
    featuredImage: z.string().min(1, 'Featured image is required'),
    author: z.string().default('JEET Technical Team'),
    isPublished: z.boolean().default(false),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    readTimeMinutes: z.number().default(5)
  })
});
