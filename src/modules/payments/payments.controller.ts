import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { paymentsService } from "./payments.service"

const createPaymentCheckoutSession = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const { rentalRequestId } = req.body;
    const result = await paymentsService.createPaymentSessionIntoDB(userId as string, rentalRequestId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment Checkout Completed Successfully.",
        data: {result}
    }) 
})

const handleWebhookPayment = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer
    const signature = req.headers["stripe-signature"]!
    await paymentsService.handleWebhook(event, signature as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Webhook triggered successfully.",
        data: null
    }) 
})

const getTenantPayments = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const result = await paymentsService.getTenantPaymentsFromDB(userId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment history retrieved successfully.",
        data: result
    }) 
})

const getTenantPaymentsById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    const paymentId = req.params?.id
    const result = await paymentsService.getTenantPaymentsByIdFromDB(userId as string, paymentId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment details retrieved successfully.",
        data: result
    }) 
})


export const paymentsController = {
    createPaymentCheckoutSession,
    handleWebhookPayment,
    getTenantPayments,
    getTenantPaymentsById 
}