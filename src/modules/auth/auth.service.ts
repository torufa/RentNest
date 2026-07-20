import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { ILoginUserPayload, IRegisterUserPayload } from "./auth.interface";
import config from "../../config";
import { JwtPayload, SignOptions } from "jsonwebtoken"
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
    if(!email){
        throw new Error("Email is required")
    }
    if(!password){
        throw new Error("Password is required")
    }

    const user = await prisma.user.findUniqueOrThrow({
        where: {email}
    })

    if(user.accountStatus === "BANNED"){
        throw new Error("Your account has been banned")
    }

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

const refreshToken = async (token : string) => {
    const verifiedRefreshToken = jwtUtils.verifyToken(token, config.JWT_REFRESH_SECRET);

    if(!verifiedRefreshToken.success){
        throw new Error(verifiedRefreshToken.error)
    }

    const {id} = verifiedRefreshToken.data as JwtPayload;

    const user = await prisma.user.findUniqueOrThrow({
        where : {id}
    })

    if(user.accountStatus === "BANNED"){
        throw new Error("Your account has been banned!")
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role : user.role,
        accountStatus: user.accountStatus
    }

    const accessToken = jwtUtils.createToken(
        jwtPayload,
        config.JWT_ACCESS_SECRET,
        config.JWT_ACCESS_EXPIRES_IN as SignOptions
    );

    return {accessToken}
}

const getCurrentUserFromDB = async(userId : string)=>{
    const user = await prisma.user.findUniqueOrThrow({
        where: {id: userId},
        omit: {password: true}
    })

    return user
}



export const auhtService = {
    registerUserIntoDB,
    loginUserIntoDB,
    refreshToken,
    getCurrentUserFromDB
}