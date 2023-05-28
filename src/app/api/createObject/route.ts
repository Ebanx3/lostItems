import { NextResponse } from "next/server";
import cloudinary from "@/cludinary";
import objectModel from "../objectModel";
import Connection from "@/dbConnection";

export async function POST(req: Request) {
    try {
        await Connection.getInstance();
        const body = await req.body?.getReader().read();
        const decoder = new TextDecoder();
        const string = await decoder.decode(body?.value);

        const { category, description, contactMethod, contactInfo, img } = JSON.parse(string);
        if (!category || !description || !contactMethod || !contactInfo || !img) {
            return NextResponse.json({ success: false, message: "body must have category, description, contactMethod, contactInfo and img" }, { status: 400 })
        }

        const result = await cloudinary.uploader.upload(img, { folder: "lostItems", crop: "thumb" });

        await objectModel.create({ category, description, contactMethod, contactInfo, imgUrl: result.secure_url });

        return NextResponse.json({ success: true }, { status: 200 })
    }
    catch (error) {

        return NextResponse.json({ success: false })

    }
}