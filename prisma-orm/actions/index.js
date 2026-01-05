"use server"

import { prisma } from "@/lib/db"


export const seedDB = async () => {
    await prisma.post.createMany({
        data: [
            { title: "Hello Prisma" },
            { title: "Prisma + next.js" },
            { title: "Postgresss for quick demo" }
        ]
    })

    console.log("[seed] Data Seed Successfully")

}


export async function createPost(title, des) {
  const post =  await prisma.post.create({
        data: {
            title: title,
            description: des
        }
    })

    return {
        success: true,
        data: post
    }
}