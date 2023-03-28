import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

export default function Menu({ items }: { items: Item[] }) {
    const renderMenu = () => {
        if (items.length > 0) {
            return items.map((item) => (
                <MenuCard key={item.id} item={item}></MenuCard>
            ));
        }
        return <p>This restaurant dose not have a menu</p>;
    };

    return (
        <main className="bg-white mt-5">
            <div>
                <div className="mt-4 pb-1 mb-1">
                    <h1 className="font-bold text-4xl">Menu</h1>
                </div>
                <div className="flex flex-wrap justify-between">
                    {renderMenu()}
                </div>
            </div>
        </main>
    );
}
