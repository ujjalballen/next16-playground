import express from "express"
import { prisma } from "./lib/prisma";

const app = express();
const port = 3000

app.use(express.json())

app.get("/", async(req, res) => {
    // await prisma.users.create({
    //     data: {
           
    //         name: "Ujjal",

    //     }
    // })
    res.json({ message: "welcome" })
})

app.listen(port, () => {
    console.log("Listen Port: 3000")
})