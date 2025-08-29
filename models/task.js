import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
         title:{
             type : String,
         },
         description :{
             type : String
         },
         status :{
            type : String,
            enum :["pending","inprogress","completed"],
            default : "pending",
         },
         duedate :{
             type : Date
         },
         owner :{
             type : mongoose.Schema.Types.ObjectId,
             ref : "User",
         }

},{
    timestamps : true
});

export const Task =  mongoose.model("Task",TaskSchema);



