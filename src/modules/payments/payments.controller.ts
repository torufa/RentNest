import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { paymentsService } from "./payments.service"

const createPaymentSession = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const result = await paymentsService.createPaymentSessionIntoDB(payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {result}
    }) 
})


export const paymentsController = {
    createPaymentSession
}