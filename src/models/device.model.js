import mongoose from "mongoose";

const visitedWebsiteSchema = new mongoose.Schema({
    websiteId:{
        type: mongoose.Schema.ObjectId,
        ref: "Website"
    },
    visitCount:{
        type:Number,
        required: true,
        default: 0
    }
})

const deviceSchema = new mongoose.Schema({
    deviceId:{
        type: Number,
        unique: true,
    },
    visitedWebsites:[visitedWebsiteSchema]
})

export const Device = mongoose.model("Device",deviceSchema)