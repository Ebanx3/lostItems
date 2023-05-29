import { NextResponse } from "next/server";
import objectModel from "../objectModel";
import Connection from "@/dbConnection";

export async function GET(req: Request) {
    try {
        await Connection.getInstance();

        const stringParams = req.url?.split("?")[1];
        const type = stringParams?.split("&")[0].split("=")[1]
        let data: string = "";
        if (stringParams?.includes("data")) {
            data = stringParams?.split("&")[1].split("=")[1]
        }

        const respondeWType = await objectModel.find({ category: type })

        if (data === "") {
            return NextResponse.json({ success: true, data: respondeWType }, { status: 200 });
        }

        const responseWData = await objectModel.find({ $text: { $search: data } })

        const res = responseWData.concat(respondeWType);

        const ress = res.filter((item, index) => res.findIndex(elem => elem._id.toString() === item._id.toString()) === index)

        return NextResponse.json({ success: true, data: ress }, { status: 200 })
    }
    catch (error: any) {
        return NextResponse.json({ success: false, url: req.url })

    }
}