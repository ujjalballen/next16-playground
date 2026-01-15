// import "dotenv/config";
// import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from '../generated/prisma/client'

// const connectionString = `${process.env.DATABASE_URL}`

// const adapter = new PrismaPg({ connectionString })
// const prisma = new PrismaClient({ adapter })

// export { prisma }


import "dotenv/config";
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaPg({ connectionString });

// Create the Prisma client
const prisma = new PrismaClient({ adapter });

// Use globalThis to avoid creating multiple clients in dev (hot reload)
const globalForPrisma = globalThis;

const database = globalForPrisma.prisma || prisma;

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = database;
}

export { database };
