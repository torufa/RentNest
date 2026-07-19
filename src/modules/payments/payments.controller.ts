import { Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { paymentsService } from "./payments.service"

const registerUser = catchAsync(async(req: Request, res: Response) => {
    const payload = req.body
    const result = await paymentsService.registerUserIntoDB(payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {result}
    }) 
})


export const paymentsController = {
    
}