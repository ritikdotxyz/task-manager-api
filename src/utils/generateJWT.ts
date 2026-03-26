import jwt from "jsonwebtoken"

const generateJWT = (userId: string) => {
    const secret = process.env.JWT_SECRET
    const payload = { userId: userId }

    const token = jwt.sign(payload, secret, {
        expiresIn: "15m"
    })

    return token
}

const generateRefreshToken = (userId: string) => {
    const secret = process.env.REFRESH_SECRET

    const token = jwt.sign({ userId: userId }, secret, { expiresIn: '7d' })

    return token
}


export { generateJWT, generateRefreshToken };