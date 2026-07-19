import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { userRoutes } from "./modules/user/user.route";
import { authRoutes } from "./modules/auth/auth.route";

const app: Application = express();

app.use(
  cors({
    origin: config.APP_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("hello world!");
});

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

export default app;
