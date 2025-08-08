import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { createRoute } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { prisma } from "./lib/prisma";
import { ProductSchema, ProductsSchema, ProductsSlugSchema } from "./modules/product/schema";

const app = new OpenAPIHono();

app.use(cors());

app.openapi(
  createRoute({
    method: "get",
    path: "/products",
    responses: {
      200: {
        content: { "application/json": { schema: ProductsSchema } },
        description: "Get all products",
      },
    },
  }),
  async (c) => {
    const products = await prisma.product.findMany();

    return c.json(products);
  }
);

app.openapi(
  createRoute({
    method: "get",
    path: "/products/{slug}",
    request: {
      params: ProductsSlugSchema,
    },
    responses: {
      200: {
        content: { "application/json": { schema: ProductSchema } },
        description: "Get all products",
      },
      404: {
        description: "Not found",
      },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    const product = await prisma.product.findUnique({
      where: { slug },
    });
    if (!product) {
      return c.json({ message: "Product not found" }, 404);
    }

    return c.json(product);
  }
);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Amazing Safari API",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
