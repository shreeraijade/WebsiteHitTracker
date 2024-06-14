import { Customer } from "../models/customer.model.js";
import { Device } from "../models/device.model.js";
import { Website } from "../models/website.model.js";

const VisiteWebsite = async (req, res) => {
    const { customerId, websiteId, deviceId } = req.body;

    if (!customerId || !websiteId || !deviceId) {
        return res.status(400).json({ message: "Insufficient Information" });
    }

    let myWebsite = await Website.findOne({ websiteId });
    if (!myWebsite) {
        return res.status(400).json({ message: "Website not found" });
    }

    let myUser = await Customer.findOne({ customerId }).populate('devices');
    if (!myUser) {
        // Create new user
        myUser = new Customer({
            customerId,
            devices: []
        });
    }

    let myDevice = await Device.findOne({ deviceId });
    if (!myDevice) {
        // Create new device
        myDevice = new Device({
            deviceId,
            visitedWebsites: [{ websiteId: myWebsite._id, visitCount: 1 }]
        });

        // Save new device to database
        await myDevice.save();

        // Add new device to user's devices list
        myUser.devices.push(myDevice._id);

        // Add new device to website's visitedDevices list
        if (!myWebsite.visitedDevices.includes(myDevice._id)) {
            myWebsite.visitedDevices.push(myDevice._id);
        }
    } else {
        // Update existing device
        let websiteVisit = myDevice.visitedWebsites.find(vw => vw.websiteId.equals(myWebsite._id));
        if (websiteVisit) {
            websiteVisit.visitCount += 1;
        } else {
            myDevice.visitedWebsites.push({ websiteId: myWebsite._id, visitCount: 1 });

            // Add new website visit to website's visitedDevices list
            if (!myWebsite.visitedDevices.includes(myDevice._id)) {
                myWebsite.visitedDevices.push(myDevice._id);
            }
        }

        // Save updated device to database
        await myDevice.save();
    }

    // Save the updated user
    await myUser.save();

    // Save the updated website
    await myWebsite.save();

    res.status(200).json({ message: "Visit recorded" });
};






const GetWebsiteVisitCountForCustomer = async (req, res) => {
    const { customerId, websiteId } = req.body;

    if (!customerId || !websiteId) {
        return res.status(400).json({ message: "Bad request" });
    }

    const existingCustomer = await Customer.findOne({ customerId }).populate('devices');

    if (!existingCustomer) {
        return res.status(401).json({ message: "Invalid CustomerId" });
    }

    let websiteVisitCount = 0;

    for (const device of existingCustomer.devices) {
        let deviceData = await Device.findById(device._id);
        for (const visitedWebsite of deviceData.visitedWebsites) {
            if (visitedWebsite.websiteId.equals(websiteId)) { // Use .equals() for ObjectId comparison
                websiteVisitCount += visitedWebsite.visitCount;
            }
        }
    }

    return res.status(200).json({ websiteVisitCount: websiteVisitCount });
};





export {VisiteWebsite, GetWebsiteVisitCountForCustomer}    

    
