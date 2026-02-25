import env from "dotenv";
env.config();

// console.log("MONGODB_URI: ",process.env.MONGODB_URI); 
import { connectDb } from "../db/dbConnection.js";
import { AuthUser } from "../modules/userAuth/authUser.model.js";
import { Profile } from "../modules/userProfile/models/profile.model.js";


const seedAdmin = async ()=>{
    try {

        // connect database 
        const databaseConnection = await connectDb();
        if(databaseConnection){
            console.log("Database connected successfully!");
        }

        // check if admin already existed
        const existedAdmin = await AuthUser.findOne({role:"Admin"});
        if(existedAdmin){
            console.log("Admin already existed!");
        };

        // create admin in AuthUser
        const admin = await AuthUser.create({
            email:process.env.ADMIN_EMAIL,
            password:process.env.ADMIN_PASSWORD,
            role:"Admin",
            phoneNumber:process.env.ADMIN_PHONE_NUMBER,
            refreshTokenVersion:0
        });

        if(admin){
            console.log("Admin Created SuccessFully!");
        }
        
        // create admin profile in Profile
        const adminProfile= await Profile.create({
            userId:admin._id,
            firstName:process.env.FIRST_NAME,
            lastName:process.env.LAST_NAME,
            phoneNumber:process.env.ADMIN_PHONE_NUMBER
        });

        if(adminProfile){
            console.log("Admin profile has been created!");
        };

    } catch (error) {
        console.log("Admin Seed Error :- ", error?.message);
        process.exit(1)
    }
};

seedAdmin();

// node --env-file=.env src/scripts/seedAdmin.js (RUN THIS COMMAND FOR CREATING ADMIN)