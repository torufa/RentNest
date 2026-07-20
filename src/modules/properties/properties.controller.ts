import { Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { propertiesService } from "./properties.service"

const getAllProperties = catchAsync(async(req: Request, res: Response) => {
    const payload = req.body
    const result = await propertiesService.getAllPropertiesFromDB(payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {result}
    }) 
})


export const propertiesController = {
    getAllProperties
}