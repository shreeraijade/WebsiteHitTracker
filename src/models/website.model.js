import mongoose from "mongoose";

const websiteSchema = new mongoose.Schema({
    websiteId:{
        type:Number,
        required: true
    },
    visitedDevices:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Device"
        }
    ]
})

export const Website = mongoose.model("Website",websiteSchema);
