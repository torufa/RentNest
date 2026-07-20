import { Router } from "express";
import { propertiesController } from "./properties.controller";

const router = Router()

router.get("/:id", propertiesController.getPropertyById)

export const propertiesRoutes = router;