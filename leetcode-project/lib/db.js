import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/client'

const connectionString = `${process.env.DATABASE_URL}`
const globalForPrisma = globalThis

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter });

const db = globalForPrisma.prisma || prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db

export { db }