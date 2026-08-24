import { Router } from "express";
import { adminController } from "./admin.controller";
import { UserRole } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router()

router.get("/users", auth(UserRole.ADMIN), adminController.getAllUser)
router.patch("/users/:id", auth(UserRole.ADMIN), adminController.updateUserStatus)
router.get("/properties", auth(UserRole.ADMIN), adminController.getAllProperties)
router.get("/rentals", auth(UserRole.ADMIN), adminController.getAllRentals)

export const adminRoutes:Router = router;