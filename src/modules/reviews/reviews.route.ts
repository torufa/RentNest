import { Router } from "express";
import { reviewsController } from "./reviews.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/", auth(UserRole.TENANT), reviewsController.createReview)
router.get("/", auth(UserRole.TENANT), reviewsController.getAllReviews)

export const reviewsRoutes:Router = router;