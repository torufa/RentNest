import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./landlord.interface";

const createPropertyIntoDB = async(payload: RegisterUserPayload) => {
    

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

export const landlordService = {
    createPropertyIntoDB
}