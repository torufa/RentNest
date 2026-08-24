import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { landlordService } from "./landlord.service"

const createProperty = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const userId = req.user?.id as string
    const result = await landlordService.createPropertyIntoDB(userId, payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Property listing created successfully",
        data: {result}
    }) 
})

const updateProperty = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const userId = req.user?.id as string
    const {id} = req.params
    const result = await landlordService.updatePropertyIntoDB(userId, id as string, payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property listing updated successfully",
        data: {result}
    }) 
})

const deleteProperty = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string
    const {id} = req.params
    const result = await landlordService.deletePropertyFromDB(userId, id as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property listing deleted  successfully",
        data: {result}
    }) 
})

const getLandlordsProperties  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string
    const result = await landlordService.getLandlordsPropertiesFromDB(userId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully.",
        data: {result}
    }) 
})
const getRentalRequestsForLandlord  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string
    const result = await landlordService.getRentalRequestsForLandlordFromDB(userId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully.",
        data: {result}
    }) 
})

const updateRentalRequestStatus  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string
    const {id} = req.params
    const {status} = req.body
    const result = await landlordService.updateRentalRequestStatusIntoDB(userId, id as string, status)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request status updated successfully.",
        data: {result}
    }) 
})


export const landlordController = {
    createProperty,
    updateProperty,
    deleteProperty,
    getLandlordsProperties,
    getRentalRequestsForLandlord,
    updateRentalRequestStatus
}