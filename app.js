import express from "express"
import userrouter from "./routes/Userroutes.js"
import cookieparser from "cookie-parser"
const app = express();


app
app.use(express.json());
app.use(cookieparser());
app.use("/api/v1/users",userrouter);
export {app}