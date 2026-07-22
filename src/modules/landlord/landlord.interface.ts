import { PropertyStatus } from "../../../generated/prisma/enums";

export interface createPropertyPayload{
    propertyName: string;
    picture?: string;
    description: string;
    amenities: string[];
    location: string;
    price : number;
    status?: PropertyStatus;
    categoryId: string;
}

export interface updatePropertyPayload{
    propertyName?: string;
    picture?: string;
    description?: string;
    amenities?: string[];
    location?: string;
    price?: number;
    status?: PropertyStatus;
    categoryId?: string;
}

export interface UpdateRentalRequestStatusPayload {
    status: "APPROVED" | "REJECTED";
}