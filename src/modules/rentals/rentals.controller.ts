import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { rentalsService } from "./rentals.service"

const registerUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const result = await rentalsService.registerUserIntoDB(payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {result}
    }) 
})


export const rentalsController = {
    
}