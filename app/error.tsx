"use client";
import Image from "next/image";
import errorIcon from "../public/icons/error.png";
export default function Error({ error }: { error: Error }) {
    return (
        <div className="h-screen bg-gray-200 flex flex-col justify-center item-center">
            <Image src={errorIcon} alt="error" className="w-56 mb-8"></Image>
            <div className="bg-white px-9 py-14 shadow rounded"></div>
            <h3 className="text-3xl font-bold">Error</h3>
            <p className="text-reg font-bold">{error.message}</p>
            <p className="mt-6 text-sm font-light">Error Code: 500</p>
        </div>
    );
}
