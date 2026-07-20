import { Router } from "express";
import { propertiesController } from "./properties.controller";

const router = Router()

router.get("/", propertiesController.getAllProperties)

export const propertiesRoutes = router;