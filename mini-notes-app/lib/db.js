import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;

let isConnect = false;

async function dbConnect(){

    if(isConnect){
        console.log("MongoDB is already Connected");
        return;
    }


    try {
        const database = await mongoose.connect(URI);

        isConnect = database.connections[0].readyState === 1;

        // console.log("Connected MongoDB: ", database)
    } catch (error) {
        console.error("Faild to Connect DB", error)
        throw error;
    }
}

export default dbConnect;