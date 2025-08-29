import jwt from "jsonwebtoken";
import { User } from "../models/user";


const authenticate = async(req,res,next)=>{
       try {
   const accesstoken = req.cookies.accesstoken || req.headers.authorization?.split(" ")[1];
        if(!accesstoken){
            return res.status(400).json({message : "accesstoken not found"})
        }
        const decodedtoken =    jwt.verify(accesstoken,process.env.ACCESS_TOKEN_SECRET);
         
        if(!decodedtoken){
           return res.status(401).json({message : "invalid access token"});
        }
        const user = await User.findById(decodedtoken._id);
        req.user = user;
        next();
       } catch (error) {
         return res.status(401).json({message : "error ",error})
       }
}

export {
    authenticate
}