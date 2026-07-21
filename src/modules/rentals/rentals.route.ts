import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { rentalsController } from "./rentals.controller";

const router = Router()

router.post("/", auth(UserRole.TENANT), rentalsController.createRentalRequest)
router.get("/", auth(UserRole.TENANT), rentalsController.getUserRentalRequests)

export const rentalsRoutes = router;