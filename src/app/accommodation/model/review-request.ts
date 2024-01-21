import { ReviewType } from "../enum/reviewtype";

export interface ReviewRequest {
    guestUsername: string,
    reviewedEntity: string,
    comment: string,
    rating: number,
    type: ReviewType
}