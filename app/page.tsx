import { Inter } from "next/font/google";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, PrismaClient, Review } from "@prisma/client";
const inter = Inter({ subsets: ["latin"] });
const prisma = new PrismaClient();

export interface RestaurantCardInterface {
    id: number;
    name: string;
    main_image: string;
    cuisine: Cuisine;
    location: Location;
    price: PRICE;
    slug: string;
    reviews: Review[];
}

const fetchRestaurants = async (): Promise<RestaurantCardInterface[]> => {
    return await prisma.restaurant.findMany({
        select: {
            id: true,
            name: true,
            main_image: true,
            cuisine: true,
            location: true,
            price: true,
            slug: true,
            reviews: true,
        },
    });
};

export default async function Home() {
    const restaurants = await fetchRestaurants();

    return (
        <main>
            <Header></Header>
            <div className="py-3 px-36 mt-10 flex flex-wrap">
                {restaurants.map((restaurant) => {
                    return (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                        ></RestaurantCard>
                    );
                })}
            </div>
        </main>
    );
}
