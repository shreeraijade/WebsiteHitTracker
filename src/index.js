import app from "./app.js";
import dbCon from "./db/dbConnection.js";


dbCon()
.then(()=>{
   app.listen(5000,()=>{
    console.log("App is listening on port 5000");
   })
})
.catch(err=> console.log(err))