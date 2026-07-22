import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { adminService } from "./admin.service"

const getAllUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllUserFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Users retrieved successfully.",
        data: {result}
    }) 
})

const updateUserStatus  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params
    const {status} = req.body
    const result = await adminService.updateUserStatusIntoDB(id as string, status)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User status updated successfully.",
        data: {result}
    }) 
})

const getAllProperties = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllPropertiesFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrieved successfully.",
        data: {result}
    }) 
})

const getAllRentals = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const result = await adminService.getAllRentalsFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrieved successfully.",
        data: {result}
    }) 
})


export const adminController = {
    getAllUser,
    updateUserStatus,
    getAllProperties,
    getAllRentals
}