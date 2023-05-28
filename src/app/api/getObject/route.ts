import { NextResponse } from "next/server";
import objectModel from "../objectModel";
import Connection from "@/dbConnection";
import mongoose from "mongoose";

export async function GET(req: Request) {
    try {
        await Connection.getInstance();
        const id = req.url.split("?")[1].split("=")[0];
        const mId = new mongoose.Types.ObjectId(id)
        const object = await objectModel.findById(mId);

        return NextResponse.json({ success: true, data: object }, { status: 200 })
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ success: false })

    }
}