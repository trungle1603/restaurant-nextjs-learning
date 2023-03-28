import { PrismaClient } from "@prisma/client";
import Menu from "../components/Menu";
import RestaurantNavBar from "../components/RestaurantNavBar";

const prisma = new PrismaClient();
const fetchItems = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: { slug },
        select: { items: true },
    });
    if (!restaurant) throw new Error("Not found restaurant");
    return restaurant;
};

export default async function RestaurantMenu({
    params,
}: {
    params: { slug: string };
}) {
    const menu = await fetchItems(params.slug);

    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
                <RestaurantNavBar slug={params.slug}></RestaurantNavBar>
                <Menu items={menu.items}></Menu>
            </div>
        </>
    );
}
