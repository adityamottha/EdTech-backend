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
import  auth  from "./modules/auth/authUser.routes.js";
app.use("/api/v1/users",auth);

// PROFILE-ROUTER
import profile from "./modules/profile/Profile.routes.js";
app.use("/api/v1/profile",profile);

// TEACHER-ROUTER
import teacher from "./modules/teacher/teacher.routes.js";
app.use("/api/v1/teacher",teacher);

// ADMIN-ROUTER
import admin from "./modules/admin/admin.routes.js";
app.use("/api/v1/admin",admin);

// COURSE-ROUTER
import course from "./modules/courses/routes/course.route.js";
app.use("/api/v1/course",course);

// ENROLLMENT ROUTER
import enrollment from "./modules/enrollment/enrollment.route.js";
app.use("/api/v1/enrollment",enrollment);

// LIVE-SESSION ROUTER
import liveSession from "./modules/liveSession/liveSession.route.js";
app.use("/api/v1/live-session",liveSession);

// NOTIFICATION ROUTER
import notification from "./modules/notification/notification.route.js";
app.use("/api/v1/notification",notification);

// ERROR MIDDLEWARE--------------------------------
import { errorMiddleware } from "./middlewares/error.middleware.js";
app.use(errorMiddleware);

export { app }