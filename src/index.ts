import { Hono } from "hono";
import { prisma } from "./lib/prisma";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.json({
    message: "Amazing Safari Backend API",
  });
});

app.get("/products", async (c) => {
  const products = await prisma.product.findMany();

  return c.json(products);
});

export default app;
