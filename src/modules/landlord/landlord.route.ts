import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/properties", auth(UserRole.LANDLORD), landlordController.createProperty)
router.put("/properties/:id", auth(UserRole.LANDLORD), landlordController.updateProperty)
router.delete("/properties/:id", auth(UserRole.LANDLORD), landlordController.deleteProperty)

router.get("/requests", auth(UserRole.LANDLORD), landlordController.getRentalRequestsForLandlord)

export const landlordRoutes = router;