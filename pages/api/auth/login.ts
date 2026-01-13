import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "../connectDb";
import { User } from "@/model/user";
import bcrypt from "bcryptjs";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    connectDb();

    const {userLogin} = req.body

    const {email, password} = userLogin

    const confirmedUser = await User.findOne({email}).select("+password");
    console.log(confirmedUser)
    if(!confirmedUser){
        return res.status(404).json({message: "User not found."})
    }
    const hashedPass = confirmedUser.password
    const isMatch = await bcrypt.compare(password, hashedPass)

    if(!isMatch){
        return res.status(401).json({message: "Password is incorrect."})
    }

    return res.status(200).json({message: "Login Success!", role: confirmedUser.role})
}