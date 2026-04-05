import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

import { prisma } from "../config/db.ts"
import type { User } from "../generated/prisma/client.ts"
import type { Request, Response } from "express"
import { generateJWT, generateRefreshToken } from '../utils/generateJWT.ts';
import { sendEmail } from '../jobs/producer.ts';

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user: User | null = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user?.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password."
            })
        }
        const accesstoken = generateJWT(user.id)
        const refreshToken = generateRefreshToken(user.id)

        // save the refreshtoken in the Httponly cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            status: "Success",
            data: {
                id: user?.id,
                username: user?.name,
                email: user?.email,
                createdAt: user?.created_at
            },
            token: accesstoken,
        })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Login failed"
        })
    }

}


const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const unqiueUser: User | null = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (unqiueUser) {
            return res.status(409).json({
                message: "User already exists."
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user: User = await prisma.user.create({
            data: {
                name: username,
                email: email,
                password: hashedPassword,
            }
        })

        const token = generateJWT(user.id)
        const refreshToken = generateRefreshToken(user.id)

        // save the refreshtoken in the Httponly cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        sendEmail(user.id)

        return res.status(201).json({
            status: "Success",
            data: {
                id: user.id,
                username: user.name,
                email: user.email,
                createdAt: user.created_at
            },
            token: token,
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            message: "Failed to create user."
        })
    }

}

const refreshTokenHandler = async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "Refresh token missing" })
    }

    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ messsage: "Invalid or expired refresh token." })
        }

        const newAccessToken = generateJWT(decoded.userId)
        const refreshToken = generateRefreshToken(decoded.userId)

        // save the refreshtoken in the Httponly cookie
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: 'None', secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({ status: "Success", token: newAccessToken })
    })
}

export { register, login, refreshTokenHandler }