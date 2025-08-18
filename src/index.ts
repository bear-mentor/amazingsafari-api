import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { Scalar } from "@scalar/hono-api-reference";

import { productRoute } from "./modules/product/route";
import { userRoute } from "./modules/user/route";
import { authRoute } from "./modules/auth/route";

const app = new OpenAPIHono();

app.use(cors());

app.route("/products", productRoute);
app.route("/users", userRoute);
app.route("/auth", authRoute);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Amazing Safari API",
  },
});

app.get("/", Scalar({ url: "/openapi.json" }));

export default app;
