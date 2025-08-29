import mongoose from "mongoose";


const Userschema = new mongoose.Schema({
         username :{
             type : String,
             required : true
         },
         email : {
            type : String,
            required : true,
         },
         password :{
             type : String,
             required : true,
         },
         refreshtoken :{
             type : String
         }
},{
 timestamps : true
})

export const User =  mongoose.model("User",Userschema);
