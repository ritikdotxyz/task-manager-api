import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";

const connectionString: string = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({
    adapter, log: process.env.ENV == "development" ? ["query", "error", "warn"] : ["error"]
})

const connectDB = async () => {
    try{
        await prisma.$connect();
        console.log("DB  connected via Prisma.")
    }catch(error){
        console.log(`Database Connection Error: ${error}`)
        process.exit(1);
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect();
}

export { prisma, connectDB, disconnectDB };