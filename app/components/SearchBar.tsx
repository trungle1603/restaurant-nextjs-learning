"use client";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// const prisma = new PrismaClient();
// const fetchLocation = async (city: string) => {
//     const location = await prisma.location.findFirst({
//         select: { name: true },
//         where: {
//             name: city,
//         },
//     });
// };

export default function SearchBar() {
    const router = useRouter();
    const [location, setLocation] = useState("");

    const renderCity = () => {
        if (location === "") {
            return;
        }
        router.push(`/search?city=${location}`);
        setLocation("");
    };

    return (
        <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
                className="rounded  mr-3 p-2 w-[450px]"
                type="text"
                placeholder="State, city or town"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <button
                onClick={renderCity}
                className="rounded bg-red-600 px-9 py-2 text-white"
            >
                Let&#39;s go
            </button>
        </div>
    );
}
