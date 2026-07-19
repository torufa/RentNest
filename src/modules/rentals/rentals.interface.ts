import { AccountStatus, UserRole } from "../../../generated/prisma/enums";

export interface RegisterUserPayload{
    name: string;
    email: string;
    password: string;
    description?: string;
    role: UserRole;
    accountStatus : AccountStatus
}