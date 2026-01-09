import express from "express"
import { prisma } from "./lib/db.js";

const app = express();
const port = 3000

app.use(express.json())

app.get("/", async (req, res) => {
    res.json({ message: "welcome" })
})

app.post("/api/users", async (req, res) => {
    const { name, email } = req.body;

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,

        },
    })

    console.log("user", user)

    return res.json({ success: true })
});

// advanced at the same time
app.post("/api/create-user", async (req, res) => {
    const { name, email, bio } = req.body;

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            profile: {
                create: {
                    bio: bio
                }
            }

        },
    })

    return res.json(user)
})


app.post('/api/posts', async (req, res) => {
    const { title, content } = req.body;

    const post = await prisma.post.create({
        data: {
            title, content, authorId: 1
        }
    })

    return res.json(post)
})

app.get("/api/posts", async (req, res) => {
    const posts = await prisma.post.findMany()

    return res.json(posts)
})

// pagination
app.get("/api/get-posts", async (req, res) => {

    const { skip, take } = req.query;

    const posts = await prisma.post.findMany({
        skip: Number(skip),
        take: Number(take) // fix => how manny post we want to show in a page
    });

    return res.json(posts)
})

app.listen(port, () => {
    console.log("Listen Port: 3000")
})