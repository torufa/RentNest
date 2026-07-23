import { prisma } from "../../lib/prisma";
import { createRentalRequestPayload } from "./rentals.interface";

const createRentalRequestIntoDB = async(payload: createRentalRequestPayload, tenantId: string) => {
    const {rentDate, rentalExpiryDate, propertyId}  = payload

    const property = await prisma.properties.findUniqueOrThrow({
        where: {id: propertyId}
    })
    if(property.status !== "AVAILABLE"){
        throw new Error("This property is not available for rental.")
    }

    const existingRequest = await prisma.rentalRequests.findFirst({
        where: {
            customerId: tenantId,
            propertyId,
            status: "PENDING"
        }
    });
    if (existingRequest) {
        throw new Error("You have already submitted a rental request for this property.");
    }

    const rent = new Date(rentDate);
    const expiry = new Date(rentalExpiryDate);
    if (isNaN(rent.getTime()) || isNaN(expiry.getTime())) {
        throw new Error("Invalid rent date or rental expiry date.");
    }

    if (rent >= expiry) {
        throw new Error("Rental expiry date must be later than the rent date.");
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (rent < today) {
        throw new Error("Rent date cannot be in the past.");
    }

    const result = await prisma.rentalRequests.create({
        data: {
            rentDate : rent,
            rentalExpiryDate: expiry,
            propertyId,
            customerId: tenantId
        }
    })

    return result;
}

const getUserRentalRequestsFromDB = async(tenantId: string) => {
    const rentalRequests = await prisma.rentalRequests.findMany({
        where: {customerId: tenantId},
        include: {
            property: true
        }
    })

    const countRentalRequests = rentalRequests.length
    return {
        total: countRentalRequests,
        result : {rentalRequests}
    }
}

const getUserRentalRequestByIdFromDB = async(rentalRequestId: string, tenantId:string) => { 
    const result = await prisma.rentalRequests.findUniqueOrThrow({
        where: {
            id: rentalRequestId,
            customerId: tenantId
        },
        include: {property: true}
    })

    return result;
}

export const rentalsService = {
    createRentalRequestIntoDB,
    getUserRentalRequestsFromDB,
    getUserRentalRequestByIdFromDB
}