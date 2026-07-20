import { Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { landlordService } from "./landlord.service"

const createProperty = catchAsync(async(req: Request, res: Response) => {
    const payload = req.body
    const userId = req.user?.id as string
    const result = await landlordService.createPropertyIntoDB(userId, payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {result}
    }) 
})


export const landlordController = {
    createProperty
}