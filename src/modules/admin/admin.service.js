import { ApiError } from "../../utils/ApiError.js";
import { AuthUser } from "../auth/authUser.model.js";

const getTeacherApplicationRequestService = async () =>{
  return await AuthUser.aggregate([
    {
      // only users who applied for teacher
      $lookup: {
        from: "teacherapplications",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$userId"]
              }
            }
          }
        ],
        as: "Applications"
      }
    },

    // remove users who did not apply
    {
        $match:{
            "Applications.0": { $exists: true }
        }
    },

    // get profile data
    {
      $lookup: {
        from: "profile",
        let: { userId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$userId"]
              }
            }
          },
          {
            $project: {
              firstName: 1,
              lastName: 1,
              phoneNumber: 1
            }
          }
        ],
        as: "profile"
      }
    },

    {
      $project: {
        email: 1,
        role: 1,
        Applications: 1,
        profile: { $arrayElemAt: ["$profile", 0] }
      }
    }
  ]);
};

// APPORVED TEACHER APPLICATATION STATUS

const approvedTeacherService = async ({userId})=>{
  // check userId is required
  if(!userId){
    throw new ApiError(400,"UserId is required!")
  };

  // find user by userId
  const user = await AuthUser.findOne({_id:userId});
  if(!user){
    throw new ApiError(404,"User not found!")
  };

  // id user has already approved status throw error 
  if(user.role === "Teacher" && user.approvalStatus === "Approved"){
    throw new ApiError(408,"Already approved profile!")
  };

  // if not so approved status
    const updateUser = await AuthUser.findByIdAndUpdate(userId,{
    role:"Teacher",
    approvalStatus:"Approved",
    statusApprovedAt: new Date()
   },
   {new:true}
  );

  // return 
  return updateUser;
}

export { 
  getTeacherApplicationRequestService,
  approvedTeacherService
 }