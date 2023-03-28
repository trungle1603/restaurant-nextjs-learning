import { Review } from "@prisma/client";

export const calculateReviewRatingAvg = (reviews: Review[]) => {
    if (!reviews?.length) {
        return 0;
    }
    return (
        reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    );
};
