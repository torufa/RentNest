import { prisma } from "../../lib/prisma";

const getPropertyByIdFromDB = async(propertyId: string) => {   

    const result = await prisma.properties.findUniqueOrThrow({
        where: {id: propertyId},
        include: {
            reviews: true
        }
    })

    return result;
}

export const propertiesService = {
    getPropertyByIdFromDB
}