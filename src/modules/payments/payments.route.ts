import { Router } from "express";
import { paymentsController } from "./payments.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../generated/prisma/enums";

const router = Router()

router.post("/create", auth(UserRole.TENANT), paymentsController.createPaymentCheckoutSession)
router.post("/confirm", paymentsController.handleWebhookPayment)
router.get("/", auth(UserRole.TENANT), paymentsController.getTenantPayments)
router.get("/:id", auth(UserRole.TENANT), paymentsController.getTenantPaymentsById)

export const paymentsRoutes = router;