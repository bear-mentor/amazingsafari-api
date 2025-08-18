import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { prisma } from "../../lib/prisma";
import { PrivateUserSchema } from "../user/schema";
import { AuthRegisterSchema } from "./schema";

export const authRoute = new OpenAPIHono();

authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    request: {
      body: {
        content: { "application/json": { schema: AuthRegisterSchema } },
      },
    },
    responses: {
      201: {
        content: { "application/json": { schema: PrivateUserSchema } },
        description: "Register success",
      },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    const user = await prisma.user.create({
      data: {
        email: body.email,
        fullName: body.fullName,
      },
    });

    return c.json(user);
  }
);
