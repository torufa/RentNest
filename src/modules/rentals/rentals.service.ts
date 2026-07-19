import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./rentals.interface";

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

export const rentalsService = {
    registerUserIntoDB
}