import mongoose from "mongoose";
import { Website } from "../models/website.model.js";  
import { Device } from "../models/device.model.js";

export const getTotalVisitCount = async (req, res) => {
    const { websiteId } = req.params;
    

    try {
        // Find the website by its websiteId
        const website = await Website.findOne({ websiteId }).populate('visitedDevices');

        if (!website) {
            return res.status(404).json({ error: "Website not found" });
        }

        let totalVisitCount = 0;

        // Iterate over each device that visited the website
        for (const device of website.visitedDevices) {
            // Find the device and sum up the visit counts
            const deviceData = await Device.findById(device._id);

            if (deviceData) {
                for (const visitedWebsite of deviceData.visitedWebsites) {
                    if (visitedWebsite.websiteId.equals(website._id)) {
                        totalVisitCount += visitedWebsite.visitCount;
                    }
                }
            }
        }

        // Respond with the total visit count
        return res.status(200).json({ websiteId, totalVisitCount });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};



