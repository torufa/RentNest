import { Router } from "express";
import { paymentsController } from "./payments.controller";

const router = Router()

router.post("/create", paymentsController.createPaymentSession)

export const paymentsRoutes = router;