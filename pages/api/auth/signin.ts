import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

interface SignInInputInterface {
    email: string;
    password: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { password, email }: SignInInputInterface = req.body;
    const errors: string[] = [];
    const validationSchema = [
        {
            valid: validator.isEmail(email),
            errorMessage: "Email invalid",
        },
        {
            valid: validator.isStrongPassword(password),
            errorMessage: "Password too weak",
        },
    ];
    validationSchema.forEach((check) => {
        if (!check.valid) {
            errors.push(check.errorMessage);
        }
    });
    if (errors.length > 0) {
        return res.status(400).json({
            message: errors[0],
            statusCode: 400,
        });
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user)
        return res.status(400).json({
            message: "Not found user",
            statusCode: 400,
        });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({
            message: "Password not match, try again",
            statusCode: 400,
        });
    }

    const token = jsonwebtoken.sign({ email: user.email }, "verySecret");
    setCookie("verySecretCookie", token, { req, res, maxAge: 60 * 6 * 24 });
    res.status(200).json({
        ...user,
        token,
    });
}
