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
};

const rejectApplicationService = async ({userId,reason})=>{
  // check userId and message is required
  if(!userId){
    throw new ApiError(400,"userId is required!");
  };

  if(!reason){
    throw new ApiError(400,"Reason is required!");
  };

  // find user by userId
  const user = await AuthUser.findOne({_id:userId})
  if(!user){
    throw new ApiError(404,"User not found")
  };
  
  // user is not approved or reject already
  if(user.approvalStatus === "Approved" && user.role === "Teacher"){
    throw new ApiError(408,"User already approved!")
  };

  if(user.approvalStatus === "Rejected"){
    throw new ApiError(408,"User already rejected!")
  };

  // update fields
  const updatedUser = await AuthUser.findByIdAndUpdate(userId,{
    approvalStatus:"Rejected",
    rejectedReason:reason
  },{new:true});

  // return
  return updatedUser;
};

// CREATE-USER-BY-ADMIN----------------------------------
const createUserService = async ({email,password,role})=>{
  // check all fields are required
  if(!email?.trim()){
    throw new ApiError(400,"Email is required!");
  };

  if(!password?.trim()){
    throw new ApiError(400,"Password is required!");
  };

  if(!role?.trim()){
    throw new ApiError(400,"Role is required!");
  };

  // find user is not register already
  const existedUser = await AuthUser.findOne({email});
  if(existedUser){
    throw new ApiError(408,"User already existed!");
  };

  // create user 
  const user = await AuthUser.create({
    email:email.toLowerCase(),
    password,
    role,
    isVarified:true,
    createdBy:"ADMIN"

  });

  // return
  return user;

};


export { 
  getTeacherApplicationRequestService,
  approvedTeacherService,
  rejectApplicationService,
  createUserService
 }