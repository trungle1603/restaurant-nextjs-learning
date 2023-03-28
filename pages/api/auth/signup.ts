import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export interface SignUpInputInterface {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const input: SignUpInputInterface = req.body;
    const errors: string[] = [];
    const validationSchema = [
        {
            valid: validator.isLength(input.firstName, { min: 1, max: 20 }),
            errorMessage: "Min 1 max 20",
        },
        {
            valid: validator.isLength(input.lastName, { min: 1, max: 20 }),
            errorMessage: "Min 1 max 20",
        },
        {
            valid: validator.isEmail(input.email),
            errorMessage: "Email invalid",
        },
        {
            valid: validator.isMobilePhone(input.phone),
            errorMessage: "Phone number invalid",
        },
        {
            valid: validator.isStrongPassword(input.password),
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

    const isExistUser = await prisma.user.findUnique({
        where: { email: input.email },
    });
    if (isExistUser)
        return res.status(400).json({
            message: "Email is exist",
            statusCode: 400,
        });

    input.password = await bcrypt.hash(input.password, 10);

    const user = await prisma.user.create({
        data: {
            first_name: input.firstName,
            last_name: input.lastName,
            password: input.password,
            city: input.city,
            email: input.email,
            phone: input.phone,
        },
    });

    const token = jsonwebtoken.sign({ email: user.email }, "verySecret");
    setCookie("verySecretCookie", token, { req, res, maxAge: 60 * 6 * 24 });
    res.status(200).json({
        ...user,
        token,
    });
}
