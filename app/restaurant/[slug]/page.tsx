import { PrismaClient } from "@prisma/client";
import Description from "./components/Description";
import Images from "./components/Images";
import Rating from "./components/Rating";
import ReservationCard from "./components/ReservationCard";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Reviews from "./components/Reviews";
import Title from "./components/Title";

const prisma = new PrismaClient();
const fetchRestaurant = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: { slug },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: true,
        },
    });

    if (!restaurant) throw new Error("Restaurant not found");
    return restaurant;
};

export default async function RestaurantDetails({
    params,
}: {
    params: { slug: string };
}) {
    const restaurant = await fetchRestaurant(params.slug);
    return (
        <>
            <div className="bg-white w-[70%] rounded p-3 shadow">
                <RestaurantNavBar slug={restaurant.slug}></RestaurantNavBar>
                <Title name={restaurant.name}></Title>
                <Rating reviews={restaurant.reviews}></Rating>
                <Description desc={restaurant.description}></Description>
                <Images images={restaurant.images}></Images>
                <Reviews reviews={restaurant.reviews}></Reviews>
            </div>
            <div className="w-[27%] relative text-reg">
                <ReservationCard></ReservationCard>
            </div>
        </>
    );
}
