import { NextRequest, NextResponse } from "next/server";
import jsonwebtoken from "jsonwebtoken";

export async function middleware(req: NextRequest, res: NextResponse) {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
        return new NextResponse(JSON.stringify({ message: "Unauthorize" }), {
            status: 401,
        });
    }

    const token = authHeader.split(" ")[1];
    const payload = jsonwebtoken.verify(token, "verySecret", {
        complete: false,
    });
    if (typeof payload === "string") {
        return new NextResponse(JSON.stringify({ message: "Unauthorize" }), {
            status: 401,
        });
    }
}

export const config = {
    matcher: ["/api/auth/me"],
};
