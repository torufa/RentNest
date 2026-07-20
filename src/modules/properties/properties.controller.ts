import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { propertiesService } from "./properties.service"

const getPropertyById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const result = await propertiesService.getPropertyByIdFromDB(id as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property details retrieved successfully",
        data: {result}
    }) 
})


export const propertiesController = {
    getPropertyById
}