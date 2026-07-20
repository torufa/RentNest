import { prisma } from "../../lib/prisma";
import { createPropertyPayload } from "./landlord.interface";

const createPropertyIntoDB = async(userId: string, payload: createPropertyPayload) => {
    const {propertyName, picture, description, amenities, location,price,status,categoryId} = payload
    const createProperty = await prisma.properties.create({
        data: {
            propertyName,
            picture : picture ?? undefined,
            description,
            amenities,
            location,
            price,
            status : status ?? undefined,
            category: {
                connect: {
                    id: categoryId
                }
            },
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })

    return createProperty;
}

export const landlordService = {
    createPropertyIntoDB
}