import { z } from 'zod';

export const pricingPackageSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(100),
    slug: z.string().min(3).max(100),
    startingPrice: z.number().min(0),
    priceNote: z.string().optional(),
    isCustomQuote: z.boolean().default(false),
    deliveryTimeEstimate: z.string().default('3-7 working days'),
    tagline: z.string().min(5),
    featuresIncluded: z.array(z.string()).default([]),
    exclusions: z.array(z.string()).default([]),
    isRecommended: z.boolean().default(false),
    isActive: z.boolean().default(true),
    order: z.number().default(0),
    badge: z.string().optional()
  })
});
