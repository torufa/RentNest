import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./payments.interface";

const registerUserIntoDB = async(payload: RegisterUserPayload) => {
    

    // const result = await prisma.user.create({
    //     data: {
    //         name,
    //         email,
    //         password,
    //         description
    //     }
    // })

    // return result;
}

export const paymentsService = {
    registerUserIntoDB
}