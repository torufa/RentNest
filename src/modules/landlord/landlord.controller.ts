import { Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { landlordService } from "./landlord.service"

const createProperty = catchAsync(async(req: Request, res: Response) => {
    const payload = req.body
    const result = await landlordService.createPropertyIntoDB(payload)
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