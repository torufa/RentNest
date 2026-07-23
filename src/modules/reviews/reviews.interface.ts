import { ReviewsStatus } from "../../../generated/prisma/enums";

export interface CreateReviewPayload{
    rentalRequestId: string;
    review: string;
    rating: number;
    status: ReviewsStatus
}