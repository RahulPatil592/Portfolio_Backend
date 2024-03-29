import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        console.log(`\nMongoDB connected !! DB Host : ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log("MongoDB connection failed : ", error)
        process.exit(1)
    }
}

export default connectDB;