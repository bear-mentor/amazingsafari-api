import { z } from "@hono/zod-openapi";

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number().positive(),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const ProductsSchema = z.array(ProductSchema);

export const ProductsSlugSchema = z.object({
  slug: z.string(),
});
