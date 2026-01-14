import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "./connectDb";
import { Employee } from "@/model/Payroll";


export default async function handler(req: NextApiRequest, res: NextApiResponse){

    await connectDb();

    try {
        const {emp} = req.body

        if(!emp){
           return res.status(401).json({message: "not valid req"})
        }

        const { name, grossPay } = emp

        const newEmp = new Employee({name, grossPay})

        await newEmp.save()

        return res.status(201).json({
            message: "Saved!",
            employee: newEmp
        })
        
    } catch (error : any) {
        console.log(error)
        return res.status(500).json({
            message: "Server error",
            error: error.message
        })
    }
}