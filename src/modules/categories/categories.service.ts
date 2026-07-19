import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./categories.interface";

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

export const categoriesService = {
    registerUserIntoDB
}