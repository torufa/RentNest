import { Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { categoriesService } from "./categories.service"

const createCategories = catchAsync(async(req: Request, res: Response) => {
    const {categoryName} = req.body
    const result = await categoriesService.createCategoriesIntoDB(categoryName)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {result}
    }) 
})
const getAllCategories = catchAsync(async(req: Request, res: Response) => {
    const result = await categoriesService.getAllCategoriesFromDB()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {result}
    }) 
})


export const categoriesController = {
    createCategories,
    getAllCategories
}