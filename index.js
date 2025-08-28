import {app} from "./app.js"
import dotenv from "dotenv";
import CONNECTDB from "./DB/index.js"
dotenv.config();


CONNECTDB()
.then(()=>{
      const PORT = 4000 || process.env.PORT;
     app.listen(PORT,()=>{
           console.log(`server is running at ${PORT}`);
     })
})
.catch(()=>{
     console.log("ERROR while connecting db");
     
})
