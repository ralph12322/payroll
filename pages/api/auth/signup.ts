import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../connectDb";
import { User } from "@/model/user";
import bcrypt from 'bcryptjs';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    connectDb();
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { userSignup } = req.body;

    const {name, email, password, role} = userSignup

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({ message: "User with this email already exists" });
    }

    const newUser = new User({ name, email, password : hashedPassword, role });
    await newUser.save();

    return res.status(201).json({message: "User Created!"})
}