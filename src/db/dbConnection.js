import mongoose from "mongoose";

const dbCon = async()=>{
    try {
        const connection = await mongoose.connect("mongodb://localhost:27017/websiteTracker")
        console.log(connection.connection.host);       
    } catch (error) {
         console.log(error);
    }   
}

export default dbCon;