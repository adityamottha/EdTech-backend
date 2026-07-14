import { Notification } from "./notification.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { Course } from "../../modules/courses/models/course.model.js"
import { TeacherApplication } from "../teacher/models/teacherApplication.model.js";
import { Enrollment } from "../enrollment/enrollment.model.js";

/* 
notification service >>>
2) notify on course enrollment ok
3) notify when user apply for teacher ok
4) notify when user approved for teacher ok
5) notify when user  application rejected for teacher + with reason ok
6) notify students when teacher create live sessions ok
7) notify students when teacher started live session
8) notify students when teacher completed live session
9) notify students when teacher cancelled the live session
10) notify when payment success
11) notify when payment failed
 */

class NotificationService {

//  =============== NOTIFY USER WHEN REGISTER ===========
  static async registerWelcomeNotificationService(userId){
    // check everything is given 

    if(!userId) throw new ApiError(
        400,
        "UserId required For registerNotification!"
    );

    // check is userAlready has register welcome notification
    const existedNotification = await Notification.findOne({
      userId,
      type:"WELCOME"
    });

    if(existedNotification) return;

    // create notification
    const notification = await Notification.create(
        {
            userId,
            title:"Welcome to addicPiano",
            message:"Explore our best courses and start your learning journey!",
            type:"WELCOME",
            priority:"LOW"
        }
    )

    // return
    return notification;
};


// ==================== GET ALL NOTIFICATIONS =================

  static async getAllNotificationsService (userId){

    // check userid is required
    if(!userId){
        throw new ApiError(
            400,
            "Userid is required!"
        )
    };

    // find notification by userId 
    const findNotification = await Notification.find({userId}).sort({ createdAt: -1})

    // return
    return findNotification
}


// ==================== NOTIFY ON COURSE ENROLLMENT ====================
 static async courseEnrollementNotificationService(courseId,studentId){

    // check all fields are required
    if(!courseId){
        throw new ApiError(
            400,
            "Course not available from this courseId"
        );
    };

    if(!studentId){
        throw new ApiError(
            400,
            "userId is required!"
        );
    };


    // find course  from courseId
    const course = await Course.findById(courseId)

    // check Course if Available
    if(!course){
        throw new ApiError(
            409,
            "Course does not existed!"
        );
    };

    // check if user Already enrolled
    const existedNotification = await Notification.findOne({
        studentId,
        type:"COURSE_ENROLLMENT",
        relatedId:courseId
    })

    if(existedNotification){
        return existedNotification;
    };

    // create notification
   const createNotification = await Notification.create({
    userId:studentId,
    title: `Successfully enrolled in ${course.title}`,
    message: `Congratulations! You have successfully enrolled in ${course.title}. We wish you a great learning journey.`,
    type: "COURSE_ENROLLMENT",
    priority: "MEDIUM",
    relatedId: course._id,
    relatedModel: "Course"
});

    // return notification
    return createNotification;
}

// ================== NOTIFY USER WHEN APPLIED FOR TEACHER ==========================
static async notifyTeacherWhenAppliedForTeacherService (userId,applicationId){

    // check userId is available
    if(!userId){
        throw new ApiError(
            400,
            "userId is required!"
        );
    };

    // find if user already done application
   const existingNotification = await Notification.findOne({
    userId,
    type: "TEACHER_APPLICATION"
    });

    if(existingNotification){
        throw new ApiError(
            409,
            "You already applied for teacher!"
        );
    };

    // create notification
    const notification = await Notification.create({
        userId,
        title: "Teacher Application Submitted",
        message: "Congratulations! You have successfully applied to become a teacher. Your application is under review.",
        type: "TEACHER_APPLICATION",
        priority: "MEDIUM",
        relatedId: applicationId,
        relatedModel: "TeacherApplication"
    })

    // return 
    return notification
}

// =============NOTIFY WHEN USER APPROVED FOR TEACHER ==================
static async teacherApprovedNotificationService (userId){

    // check userId is available
    if(!userId){
        throw new ApiError(
            400,
            "userId is required!"
        );
    };

    // find if teacher already have a Approved notification
    const existingApprovedNotification = await Notification.findOne({
        userId,
        type:"TEACHER_APPROVED"
    });

    if(existingApprovedNotification){
        throw new ApiError(
            409,
            "Already have approved notification!"
        );
    };

    // create notification
     const notification = await Notification.create({
        userId,
        title: "Welcome Aboard!",
        message: "Congratulations! Your teacher application has been approved. Welcome to the teaching team!",
        type:"TEACHER_APPROVED",
        priority: "MEDIUM",
        relatedId: userId,
        relatedModel: "AuthUser"
    }); 

    // return
    return notification
}


// ================= NOTIFY USER WHEN REJECTED BY TEACHER ================
static async teacherRejactedNotificationService (userId,reason){

    // check userId is available
    if(!userId){
        throw new ApiError(
            200,
            "userId is required!"
        );
    };

    // check if notification already available find and check
    const existedNotification = await Notification.findOne({
            userId,
            type:"TEACHER_REJECTED"
         });

         if(existedNotification){
            throw new ApiError(
                408,
                "Notification already has been sent!"
            );
         };

    // create notification 
   const notification = await Notification.create({
    userId,
    title: "Application Rejected",
    message: `We regret to inform you that your application has been declined for the following reason: ${reason}. If you have any questions, please reach out to our support team.`,
    type: "TEACHER_REJECTED",
    priority: "MEDIUM",
    relatedId: userId,
    relatedModel: "AuthUser"
});

    // return 
    return notification;
};

// =============== NOTIFY STUDENT WHEN TEACHER CREATE LIVE-SESSION 
static async liveSessionCreateNotificationService ({courseId,title,liveSessionId}){
    //check courseId is available
    if(!courseId){
        throw new ApiError(
            400,
            "CourseId is required"
        );
    };

    // check live sessionId is required
    if(!liveSessionId){
        throw new ApiError(
            400,
            "liveSessionId is required"
        );
    };

    // check title is available
    if(!title){
        throw new ApiError(
            400,
            "Title is required!"
        );
    };

    // find enrolled student with courseId
    const enrolledStudents = await Enrollment.find({courseId}).select("studentId");

    if(enrolledStudents.length === 0 ){
        throw new ApiError(
            404,
            "No students are enrolled in this course."
        );
    };

    // map on students
    const notification = enrolledStudents.map((student) =>({
        userId: student.studentId,
        title: `New Live Session ${title}`,
        message: `Your teacher has scheduled "${title}". Join on time!`,
        type: "LIVE_SESSION_CREATED",
        priority: "HIGH",
        relatedId: liveSessionId,
        relatedModel: "LiveSession",
    }));

    // send notification by insertMany
    const createNotification = await Notification.insertMany(notification);

    // return
    return createNotification;

}

}

export default NotificationService;