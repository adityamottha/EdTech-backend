import { connectDb } from "./db/dbConnection.js";
import { app } from "./app.js";
import dotenv from "dotenv";

dotenv.config(
    {
        path:"./.env"
    }
)

const PORT = process.env.PORT || 8000
connectDb()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("BACKEND RUNNING ON PORT ",PORT);
    })
}).catch((err)=>{
    console.log("MONGO_DB CONNECTION ERROR :-", err?.message)
});