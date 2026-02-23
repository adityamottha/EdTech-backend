import { connectDb } from "../db/dbConnection.js";
import { AuthUser } from "../modules/userAuth/authUser.model.js";
import { Profile } from "../modules/userProfile/models/profile.model.js";
import env from "dotenv";

env.config();

const seedAdmin = async ()=>{
    // connect database 
    // check id admin already existed
    // hashed password
    // create admin in AuthUser
    // create admin profile in Profile
};

seedAdmin();