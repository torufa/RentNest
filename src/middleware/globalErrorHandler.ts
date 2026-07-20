import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../generated/prisma/client";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error : ", err);

    let statusCode;
    let errorMessage = err.message || "Internal Server Error";
    let errorName = err.name || "Internal Server Error";
    let errorDetails = err.stack


    if(err instanceof Prisma.PrismaClientValidationError){
        statusCode = httpStatus.BAD_REQUEST;
        errorMessage = "Invalid request data. Please check the provided fields."
    }else if(err instanceof Prisma.PrismaClientKnownRequestError){
        if(err.code === "P2002"){
            statusCode = httpStatus.BAD_REQUEST,
            errorMessage = "Duplicate value violates a unique constraint."
        }else if(err.code === "P2003"){
            statusCode = httpStatus.BAD_REQUEST,
            errorMessage = "Foreign key constraint violation"
        }else if(err.code === "P2025"){
            statusCode = httpStatus.BAD_REQUEST,
                errorMessage = "The requested record does not exist."
        }
    }else if(err instanceof Prisma.PrismaClientInitializationError){
       if(err.errorCode === "P1000"){
            statusCode = httpStatus.UNAUTHORIZED;
            errorMessage = "Database authentication failed."
       }else if(err.errorCode === "P1001"){
            statusCode = httpStatus.BAD_REQUEST;
            errorMessage = "Unable to connect to the database server."
       }
    }else if(err instanceof Prisma.PrismaClientUnknownRequestError){
            statusCode = httpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = "An unexpected database error occurred."
    }

    res.status(statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        statusCode: statusCode || httpStatus.INTERNAL_SERVER_ERROR,
        name : errorName,
        message: errorMessage,
        error: errorDetails
    })
}