import { prisma } from "../../lib/prisma";
import { createPropertyPayload, updatePropertyPayload } from "./landlord.interface";

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

const updatePropertyIntoDB = async(userId: string, propertyId: string, payload: updatePropertyPayload) => {
    const property = await prisma.properties.findUniqueOrThrow({
        where: {id: propertyId}
    })
    if(property.userId !== userId){
        throw new Error("You can only update your own property listings.")
    }

    const updateProperty = await prisma.properties.update({
        where: {id: propertyId},
        data:payload
    })

    return updateProperty;
}

const deletePropertyFromDB = async(userId: string, propertyId: string) => {
    const property = await prisma.properties.findUniqueOrThrow({
        where: {id: propertyId}
    })
    if(property.userId !== userId){
        throw new Error("You can only delete your own property listings.")
    }

    const updateProperty = await prisma.properties.delete({
        where: {id: propertyId}
    })

    return updateProperty;
}

export const landlordService = {
    createPropertyIntoDB,
    updatePropertyIntoDB,
    deletePropertyFromDB
}