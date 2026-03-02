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
  // find user by userId
  // id user has already approved status throw error 
  // if not  so approved status
  // update fields like approvedAt 
  // return 

}

export { getTeacherApplicationRequestService }