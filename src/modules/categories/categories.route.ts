import { Router } from "express";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";
import { categoriesController } from "./categories.controller";

const router = Router()

router.post("/create", auth(UserRole.ADMIN), categoriesController.createCategories)
router.get("/", categoriesController.getAllCategories)

export const categoriesRoutes = router;