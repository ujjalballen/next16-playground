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


export async function createPost(formData) {
    const title = formData.get("title");
    const description = formData.get("description");

    const post = await prisma.post.create({
        data: {
            title: title,
            description: description
        }
    })

    console.log("Data inserted successfully")
    return {
        success: true,
        data: post
    }
}


export async function getPosts() {
    const posts = await prisma.post.findMany()

    return posts;
}