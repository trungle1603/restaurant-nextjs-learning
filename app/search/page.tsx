import { PRICE, PrismaClient } from "@prisma/client";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import SearchSideBar from "./components/SearchSideBar";

interface SearchParams {
    city?: string;
    cuisine?: string;
    price?: PRICE;
}

const prisma = new PrismaClient();
const fetchRestaurantBy = async (searchParams: SearchParams) => {
    const select = {
        name: true,
        id: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true,
        reviews: true,
    };
    if (!searchParams) return await prisma.restaurant.findMany({ select });

    const where = {};
    const { city, cuisine, price } = searchParams;
    if (city) {
        Object.assign(where, {
            location: { name: { equals: city.toLowerCase() } },
        });
    }
    if (cuisine) {
        Object.assign(where, {
            cuisine: { name: { equals: cuisine.toLowerCase() } },
        });
    }
    if (price) Object.assign(where, { price });

    return await prisma.restaurant.findMany({ select, where });
};
const fetchLocation = async () => await prisma.location.findMany();
const fetchCuisine = async () => await prisma.cuisine.findMany();

export default async function Search({
    searchParams,
}: {
    searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
    const restaurants = await fetchRestaurantBy(searchParams);
    const locations = await fetchLocation();
    const cuisines = await fetchCuisine();

    const renderRestaurant = () => {
        if (restaurants.length < 0) {
            return <p>No data</p>;
        }
        return restaurants.map((restaurant) => {
            return (
                <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                ></RestaurantCard>
            );
        });
    };

    return (
        <>
            <Header></Header>
            <div className="flex py-4 m-auto w-2/3 justify-between items-start">
                <SearchSideBar
                    locations={locations}
                    cuisines={cuisines}
                    searchParams={searchParams}
                ></SearchSideBar>
                <div className="w-5/6">{renderRestaurant()}</div>
            </div>
        </>
    );
}
