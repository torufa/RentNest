import { RentalRequestsStatus, ReviewsStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { CreateReviewPayload } from "./reviews.interface";

const createReviewIntoDB = async(tenantId: string, payload: CreateReviewPayload) => {
    const {rentalRequestId, review, rating, status} = payload

    const rentalRequest = await prisma.rentalRequests.findUniqueOrThrow({
        where: {
            id : rentalRequestId,
        },
        include: {
            property: true,
        },
    });

    if (rentalRequest.customerId !== tenantId) {
        throw new Error("This rental request is not yours.");
    }
    if (rentalRequest.status !== RentalRequestsStatus.PAID) {
        throw new Error("You can review only after completing the payment.");
    }
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
        throw new Error("Rating must be a number between 0 and 5.");
    }
    if (typeof rating !== "number" || rating < 0 || rating > 5) {
        throw new Error("Rating must be a number between 0 and 5.");
    }

    const isExists = await prisma.reviews.findUnique({
        where: {
            id: rentalRequestId,
        }
    });
    if (isExists) {
        throw new Error("You have already reviewed this rental.");
    }

    const result = await prisma.reviews.create({
        data: {
            review,
            rating,
            status: ReviewsStatus.PUBLISHED,
            userId: tenantId,
            propertyId: rentalRequest.propertyId
        },
        include: {
            property: true
        }
    });

    return result;
}

const getMyReviewsFromDB = async(tenantId: string) => {
    const rentalRequests = await prisma.reviews.findMany({
        where: {userId: tenantId},
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

export const reviewsService = {
    createReviewIntoDB,
    getMyReviewsFromDB
}