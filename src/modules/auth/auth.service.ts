import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUserPayload, IRegisterUserPayload } from "./auth.interface";
import config from "../../config";
import jwt, { SignOptions } from "jsonwebtoken"
import { jwtUtils } from "../../utils/jwt";

const registerUserIntoDB = async(payload: IRegisterUserPayload) => {
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

const loginUserIntoDB = async(payload: ILoginUserPayload)=>{
    const {email, password} = payload

    const user = await prisma.user.findUniqueOrThrow({
        where: {email}
    })

    const isPassMatched = await bcrypt.compare(password, user.password)
    if(!isPassMatched){
        throw new Error("Password is incorrect")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role : user.role,
        accountStatus: user.accountStatus
    }
    const accessToken = jwtUtils.createToken(jwtPayload, config.JWT_ACCESS_SECRET, config.JWT_ACCESS_EXPIRES_IN as SignOptions)
    const refreshToken = jwtUtils.createToken(jwtPayload, config.JWT_REFRESH_SECRET, config.JWT_REFRESH_EXPIRES_IN as SignOptions)

    return {accessToken, refreshToken}
}

export const auhtService = {
    registerUserIntoDB,
    loginUserIntoDB
}