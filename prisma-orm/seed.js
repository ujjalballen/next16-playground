import { prisma } from "./lib/db.js";

async function main() {
    await prisma.post.createMany({
        data: [
            { title: "Hello Prisma" },
            { title: "Prisma + next.js" },
            { title: "Postgresss for quick demo" }
        ]
    })

    console.log("[seed] Data Seed Successfully")
}


main().catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
        await prisma.$disconnect();
    });