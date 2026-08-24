import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { reviewsService } from "./reviews.service"

const createReview = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const payload = req.body
    const userId = req.user?.id
    const result = await reviewsService.createReviewIntoDB(userId as string, payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {result}
    }) 
})

const getAllReviews  = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string
    const result = await reviewsService.getMyReviewsFromDB(userId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully.",
        data: {result}
    }) 
})

export const reviewsController = {
    createReview,
    getAllReviews
}