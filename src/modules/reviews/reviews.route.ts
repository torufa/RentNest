import { Router } from "express";
import { reviewsController } from "./reviews.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/", auth(UserRole.TENANT), reviewsController.createReview)

export const reviewsRoutes = router;