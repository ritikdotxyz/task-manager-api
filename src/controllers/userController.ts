import bcrypt from 'bcrypt';

import { prisma } from "../config/db.ts"
import type { User } from "../generated/prisma/client.ts"
import type { Request, Response } from "express"

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

    const user: User | null = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(!user){
        return res.status(401).json({
            message: "Invalid email or password."
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password)

    if (!isPasswordValid){
        return res.status(401).json({
            message: "Invalid email or password."
        })
    }

    return res.status(200).json({
        status: "Success",
        data: {
            id: user?.id,
            username: user?.name,
            email: user?.email,
            createdAt: user?.created_at
        }
    })
    }
    catch(error){
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

        if(unqiueUser){
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

        return res.status(201).json({
            status: "Success",
            data: {
                id: user.id,
                username: user.name,
                email: user.email,
                createdAt: user.created_at
            }
        })
    }
    catch(error){
        console.log(error)
        res.status(400).json({
            message: "Failed to create user."
        })
    }

}


export { register, login }