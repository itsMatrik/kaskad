import { defineCollection, z } from 'astro:content';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const products = defineCollection({
  schema: z.object({
    productId: z.number(),
    slug: z.string(),
    name: z.string(),
    category: z.string(),
    subcategory: z.string(),
    image: z.string(),
    imageHover: z.string(),
    inStock: z.boolean(),
    price: z.string(),
  }),
  loader: async () => {
    const raw = readFileSync(resolve('./src/data/products.json'), 'utf-8');
    const items = JSON.parse(raw) as Array<Record<string, unknown>>;
    return items.map((item) => {
      const numericId = item.id as number;
      const { id, ...rest } = item;
      return {
        id: String(numericId),
        productId: numericId,
        ...rest,
      };
    });
  },
});

export const collections = { products };
