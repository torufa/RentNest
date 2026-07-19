import { AccountStatus, UserRole } from "../../../generated/prisma/enums";

export interface IRegisterUserPayload{
    name: string;
    email: string;
    password: string;
    description?: string;
    role: UserRole;
    accountStatus : AccountStatus
}

export interface ILoginUserPayload {
    email: string;
    password: string;
}