import { Request, Response } from "express"
import httpStatus from "http-status"
import { sendResponse } from "../../utils/sendResponse"
import { catchAsync } from "../../utils/catchAsync"
import { auhtService } from "./auth.service"

const registerUser = catchAsync(async(req: Request, res: Response) => {
    const payload = req.body
    const result = await auhtService.registerUserIntoDB(payload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registered successfully",
        data: {result}
    }) 
})

const loginUser = catchAsync(async(req: Request, res: Response)=>{
    const payload = req.body
    const {accessToken, refreshToken} = await auhtService.loginUserIntoDB(payload)
    
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure: false,
        sameSite: "none",
        maxAge: 1000*60*60*24
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000*60*60*24*30
    })
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Login successful",
        data: {accessToken, refreshToken}
    }) 
})




// const loginUser = catchAsync(async(req: Request, res: Response)=>{
    
// })
export const authController = {
    registerUser,
    loginUser
}