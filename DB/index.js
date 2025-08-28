import mongoose from "mongoose";



const CONNECTDB = async()=>{
       try {
         const connectioninstance = await mongoose.connect(process.env.MONGOURL);
         console.log(`database connected successfully `);
       } catch (error) {
          console.log("mongodb connection failed ", error);
          process.exit(1);
       }
}

export default CONNECTDB;