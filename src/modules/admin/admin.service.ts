import { prisma } from "../../lib/prisma";

const getAllUserFromDB = async() => {   

    const result = await prisma.user.findMany({
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

    return result;
}

export const adminService = {
    getAllUserFromDB
}