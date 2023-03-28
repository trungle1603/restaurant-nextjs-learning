import Stars from "@/app/components/Star";
import { calculateReviewRatingAvg } from "@/utilities/calculate-review-rating-avg";
import { Review } from "@prisma/client";

export default function Rating({ reviews }: { reviews: Review[] }) {
    return (
        <div className="flex items-end">
            <div className="ratings mt-2 flex items-center">
                <Stars reviews={reviews}></Stars>
                <p className="text-reg ml-3">
                    {calculateReviewRatingAvg(reviews).toFixed(1)}
                </p>
            </div>
            <div>
                <p className="text-reg ml-4">{reviews.length} Reviews</p>
            </div>
        </div>
    );
}
