import mongoose, { Types } from "mongoose";

const customerSchema = new mongoose.Schema({
    customerId:{
        type: Number,
        unique: true,
    },
    devices:[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Device"
        }
    ]
})

export const Customer = mongoose.model("Customer",customerSchema)