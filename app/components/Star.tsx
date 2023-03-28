import { calculateReviewRatingAvg } from "@/utilities/calculate-review-rating-avg";
import { Review } from "@prisma/client";
import Image from "next/image";
import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStar from "../../public/icons/empty-star.png";

export default function Stars({
    reviews,
    rating,
}: {
    reviews: Review[];
    rating?: number;
}) {
    const reviewRating = rating || calculateReviewRatingAvg(reviews);

    const renderStar = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            const difference = parseFloat((reviewRating - i).toFixed(1));
            if (difference >= 1) {
                stars.push(fullStar);
            } else if (difference < 1 && difference > 0) {
                if (difference <= 0.2) {
                    stars.push(emptyStar);
                } else if (difference > 0.2 && difference <= 0.6) {
                    stars.push(halfStar);
                } else {
                    stars.push(fullStar);
                }
            } else {
                stars.push(emptyStar);
            }
        }
        return stars.map((star, index) => (
            <Image
                key={index}
                src={star}
                alt=""
                className="w-4 h-4 mr-1"
            ></Image>
        ));
    };

    return <div className="flex items-center">{renderStar()}</div>;
}
