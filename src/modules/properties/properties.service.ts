import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./properties.interface";

const getAllPropertiesFromDB = async(payload: RegisterUserPayload) => {
    

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

export const propertiesService = {
    getAllPropertiesFromDB
}