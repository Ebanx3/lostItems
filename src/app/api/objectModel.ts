import { Schema, model, models } from "mongoose";

const ObjectSchema = new Schema({
    category: String,
    description: String,
    contactMethod: String,
    contactInfo: String || Number,
    imgUrl: String
}, {
    versionKey: false
})

ObjectSchema.index({ description: "text" })

export default models.Object || model("Object", ObjectSchema);