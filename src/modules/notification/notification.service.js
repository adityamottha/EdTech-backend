import { Notification } from "./notification.model.js";
import { ApiError } from "../../utils/ApiError.js";

/* 
notification service >>>
2) notify on course enrollment
3) notify when user apply for teacher
4) notify when user approved for teacher
5) notify when user  application rejected for teacher + with reason
6) notify students when teacher create live sessions
7) notify students when teacher started live session
8) notify students when teacher completed live session
9) notify students when teacher cancelled the live session
10) notify when payment success
11) notify when payment failed
 */

//  =============== NOTIFY USER WHEN REGISTER ===========
const registerWelcomeNotificationService = async (userId)=>{
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

const getAllNotificationsService = async (userId) =>{

    // check userid is required
    if(!userId){
        throw new ApiError(
            400,
            "Userid is required!"
        )
    };

    // find notification by userId 
    const findNotification = await Notification.findById(userId)

    // return
    return findNotification
}

export {
    registerWelcomeNotificationService,
    getAllNotificationsService
};
