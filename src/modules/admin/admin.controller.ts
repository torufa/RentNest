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
        message: "User registered successfully",
        data: {result}
    }) 
})


export const adminController = {
    getAllUser
}