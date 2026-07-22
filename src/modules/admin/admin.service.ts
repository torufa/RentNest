import { prisma } from "../../lib/prisma";
import { UpdateUserStatusPayload } from "./admin.interface";

const getAllUserFromDB = async() => {   

    const users = await prisma.user.findMany({
        where: {
            OR: [
                {role: "LANDLORD"},
                {role: "TENANT"}
            ]
        },
        omit: {
            password: true
        },
        orderBy: {
            role: "desc"
        }
    })

    const countUsers = users.length
    return {
        total: countUsers,
        users: users
    };
}

const updateUserStatusIntoDB  = async(userId: string, status: UpdateUserStatusPayload['status'] ) => {
    if (status !== "ACTIVE" && status !== "BANNED") {
        throw new Error("Status must be either ACTIVE or BANNED.");
    }

    const result = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            accountStatus: status 
        }
    })

    return result
}

const getAllPropertiesFromDB = async() => {   

    const properties = await prisma.properties.findMany({
        omit: {categoryId: true},
        include: {category: true}
    })

    const countProperties = properties.length
    return {
        total: countProperties,
        properties: properties
    };
}

const getAllRentalsFromDB = async() => {   

    const rentalRequests = await prisma.rentalRequests.findMany({
        omit: {customerId: true, propertyId: true},
        include: {
            customer: {
                omit: {password: true}
            },
            property: {
                omit: {categoryId: true, userId: true},
                include: {
                    category: true,
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    })

    const countRentalRequests = rentalRequests.length
    return {
        total: countRentalRequests,
        RentalRequests: rentalRequests
    };
}


export const adminService = {
    getAllUserFromDB,
    updateUserStatusIntoDB,
    getAllPropertiesFromDB,
    getAllRentalsFromDB
}