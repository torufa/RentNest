import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { rentalsService } from "./rentals.service"

const createRentalRequest  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const userId = req.user?.id as string
    const result = await rentalsService.createRentalRequestIntoDB(payload, userId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Rental request submitted successfully",
        data: {result}
    }) 
})

const getUserRentalRequests  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string
    const result = await rentalsService.getUserRentalRequestsFromDB(userId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully.",
        data: {result}
    }) 
})

const getUserRentalRequestById = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const userId = req.user?.id as string;
    const result = await rentalsService.getUserRentalRequestByIdFromDB(id as string, userId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request details retrieved successfully",
        data: {result}
    }) 
})


export const rentalsController = {
    createRentalRequest,
    getUserRentalRequests,
    getUserRentalRequestById
}