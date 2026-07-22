import { Router } from "express";
import { adminController } from "./admin.controller";
import { UserRole } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router()

router.get("/users", auth(UserRole.ADMIN), adminController.getAllUser)

export const adminRoutes = router;