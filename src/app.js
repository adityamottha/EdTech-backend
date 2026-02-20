import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors(
    {
        origin:process.env.CORS_ORIGIN,
        credentials:true
    }
));

app.use(express.json({limit:"16kb"}));
app.use(express.static("public/temp"));
app.use(express.urlencoded({limit:"16kb",extended:true}));
app.use(cookieParser());

// AUTH-ROUTER
import  auth  from "./modules/userAuth/authUser.routes.js"
app.use("/api/v1/users",auth);


// ERROR MIDDLEWARE--------------------------------
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);


export { app }