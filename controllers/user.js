import { User } from "../models/user.js";
import  jwt from "jsonwebtoken"
import  bcrypt from "bcrypt"


const generatetokens = (userid)=>{
         const accesstoken = jwt.sign(
           {_id : userid},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "7h"},
         )
         const refreshtoken = jwt.sign(
            {_id : userid},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn : "14d"}
         )
         return {accesstoken,refreshtoken}
}



const registerUser = async(req,res)=>{
         const {username,email,password} = req.body;
         if(!username || !email || !password){
             return res.status(404).json({message : "all details are required"});
         }
         const existeduser = await User.findOne({
            $or : [{email},{username}]
            }
        )
        if(existeduser){
            return res.status(404).json({message : "User with email or password is already registerd"});
        }
        const hashedpasswrd = await bcrypt.hash(password,10);
         
        const newUser = await User.create({
             email,
             password : hashedpasswrd,
             username 
        })
        if(!newUser){
            res.status(409).json({message : "error while registering the user"})
        }
        const user = await User.findById(newUser._id).select(
              "-password -refreshtoken"
        )

        return res.status(201).json({message : "User createrd successfully",user});

    }




const loginUser = async(req,res)=>{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message : "please provide email and password both"})
        }
        const user = await User.findOne(
            {email}
        )
        if(!user){
            return res.status(400).json({message : "user not registered"})
        }
        const comparepassword = await bcrypt.compare(password,user.password);
        if(!comparepassword){
            return res.status(401).json({message : "invalid user credentials"});
        }
        const {accesstoken,refreshtoken} = generatetokens(user._id);
        if(!accesstoken || !refreshtoken){
            return res.status(500).json({message:"error while generationg tokens"});
        }
        user.refreshtoken = refreshtoken
        user.save({validateBeforeSave : false});
        const loggedinuser = await User.findById(user._id).select(
             "-password -refreshtoken"
        )
        const options = {
            httpOnly : true,
            secure : true,
        }
        res.status(200)
        .cookie("accesstoken",accesstoken,options)
        .cookie("refreshtoken",refreshtoken,options)
        .json({message : "User logged in successfully",loggedinuser})
}



    export {
        registerUser,
        loginUser
    }




