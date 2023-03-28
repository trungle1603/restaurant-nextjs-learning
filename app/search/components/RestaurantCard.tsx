import Price from "@/app/components/Price";
import Stars from "@/app/components/Star";
import { calculateReviewRatingAvg } from "@/utilities/calculate-review-rating-avg";
import { Cuisine, PRICE, Location, Review } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface RestaurantCard {
    id: number;
    name: string;
    main_image: string;
    price: PRICE;
    cuisine: Cuisine;
    location: Location;
    slug: string;
    reviews: Review[];
}

export default function RestaurantCard({
    restaurant,
}: {
    restaurant: RestaurantCard;
}) {
    const renderRatingText = () => {
        const rating = calculateReviewRatingAvg(restaurant.reviews);
        if (rating > 4) return "Awesome";
        return "Nice";
    };

    return (
        <div className="border-b flex pb-5 ml-4">
            <Image
                src={restaurant.main_image}
                alt={"image of " + restaurant.slug}
                className="w-44 rounded"
                width={320}
                height={320}
            />
            <div className="pl-5">
                <h2 className="text-3xl">{restaurant.name}</h2>
                <div className="flex items-start">
                    <Stars reviews={restaurant.reviews}></Stars>
                    <p className="ml-2 text-sm">{renderRatingText()}</p>
                </div>
                <div className="mb-9">
                    <div className="font-light flex text-reg">
                        <Price price={restaurant.price}></Price>
                        <p className="mr-4 capitalize">
                            {restaurant.cuisine.name}
                        </p>
                        <p className="mr-4 capitalize">
                            {restaurant.location.name}
                        </p>
                    </div>
                </div>
                <div className="text-red-600">
                    <Link href={`restaurant/${restaurant.slug}`}>
                        View more information
                    </Link>
                </div>
            </div>
        </div>
    );
}
