import { ReviewType } from "../enum/reviewtype";

export interface ReviewResponse {
    id: string,
    guestName: string,
    reviewedEntityName: string,
    comment: string,
    rating: number,
    type:ReviewType,
    date: string
}