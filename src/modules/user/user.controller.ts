import { Request, Response } from "express"
import { userService } from "./user.service"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"

// const registerUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {

//     const payload = req.body
//     const result = await userService.registerUserIntoDB(payload)
//     sendResponse(res, {
//         success: true,
//         statusCode: httpStatus.CREATED,
//         message: "User registered successfully",
//         data: {result}
//     }) 
// })


export const userController = {
    
}