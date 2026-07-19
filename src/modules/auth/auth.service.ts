import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { RegisterUserPayload } from "./auth.interface";
import config from "../../config";

const registerUserIntoDB = async(payload: RegisterUserPayload) => {
    const {name, email, password, description, role, accountStatus} = payload

    const isUserExists = await prisma.user.findUnique({
        where: {email}
    })
    if(isUserExists){
        throw new Error("User already exists with this email!")
    }

    const hashedPass = await bcrypt.hash(password, Number(config.BCRYPT_SALT_ROUND))

    const createUser = await prisma.user.create({
        data: {
            name,
            email,
            password : hashedPass,
            description,
            role,
            accountStatus
        }
    })

    const result = await prisma.user.findUnique({
        where: {id: createUser.id},
        omit: {password: true}
    })

    return result;
}

export const auhtService = {
    registerUserIntoDB
}