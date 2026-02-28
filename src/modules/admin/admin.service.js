import { AuthUser } from "../auth/authUser.model.js";

const getTeacherApplicationRequestService = async () =>{
    return AuthUser.aggregate([
        {
            // only users who apply for teacher
            $lookup:{
                from: "TeacherApplication",
                let: { userId: "$_id" },
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $eq: ["$userId", "$$userId"]
                            }
                        }
                    }
                ],
                as: "Applications"
            }
        },

        // remove user who did not apply 
        {
            $match :{
                teacherApplication : {$ne : [] }
            }
        },

        // get profile data 
       {
        $lookup:{
            from: "Profile",
            let: {userId: "$_id"},
            pipeline:[
                {
                    $match:{
                        $expr:{
                            $eq:["$userId" ,"$$userId"],
                        }
                    }
                },
                {
                    $project:{
                        firstName: 1,
                        lastName: 1,
                        phoneNumber: 1
                    }
                }
            ],
            as:"profile"
        }
       },

       {
        $project:{
            email: 1,
            role: 1,
            teacherApplication: 1,
            profile: { $arrayElemAt: ["$profile", 0] }
        }
       }
    ])
}

export { getTeacherApplicationRequestService }