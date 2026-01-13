import mongoose from "mongoose";

let isConnected = false;

const connectDb = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("Already connected to the database");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: 'payroll',
        });

        isConnected = true;
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        isConnected = false;
        throw error;
    }
};

export default connectDb;