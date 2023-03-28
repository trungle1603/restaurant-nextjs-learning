import jsonwebtoken from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json("Unauthorize");
    }

    const token = authHeader.split(" ")[1];
    const payload = jsonwebtoken.verify(token, "verySecret", {
        complete: false,
    });
    if (typeof payload === "string") {
        return res.status(400).json("Unauthorize");
    }

    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });
    if (!user) {
        res.status(400).json({
            message: "User not found",
        });
    }

    res.status(200).json({
        ...user,
    });
}
