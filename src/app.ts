import express, { Application, Request, response, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { authRoutes } from "./modules/auth/auth.route";
import { propertiesRoutes } from "./modules/properties/properties.route";
import { categoriesRoutes } from "./modules/categories/categories.route";
import { landlordRoutes } from "./modules/landlord/landlord.route";
import { rentalsRoutes } from "./modules/rentals/rentals.route";
import { paymentsRoutes } from "./modules/payments/payments.route";
import { reviewsRoutes } from "./modules/reviews/reviews.route";
import { adminRoutes } from "./modules/admin/admin.route";
import { notFound } from "./middleware/notFound";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { stripe } from "./lib/stripe";

const app: Application = express();

app.use(
  cors({
    origin: config.APP_URL,
    credentials: true,
  }),
);

app.use("/api/payments/confirm", express.raw({type : 'application/json'}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world!");
});

app.use("/api/auth", authRoutes)
app.use("/api/categories", categoriesRoutes)
app.use("/api/landlord", landlordRoutes)
app.use("/api/properties", propertiesRoutes)
app.use("/api/rentals", rentalsRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/payments", paymentsRoutes)

app.use("/api/reviews", reviewsRoutes)

app.use(notFound)
app.use(globalErrorHandler)

export default app;
