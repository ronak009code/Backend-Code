import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError }  from "../utils/ApError.js";
import { user } from "../Models/user.models.js"; 
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req ,res) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists : username,email
    // check for images ,avatar
    // upload them to cloudinary
    // create user obeject -create entry in db
    // remove password and refresh token from response
    // check for user creation 
    // return response


    const  {FullName, email,username,password} = req.body
     console.log("email : ",  email);
     
     
     if (
        [FullName , email , username , password].some( (field) =>
          field?.trim() === "" )
     ) {
        throw new ApiError(400,"All fields are required")
     }

     const existedUser =  user.findOne({
        $or : [{ username },{ email }]
      })

      if (existedUser) {
         throw new ApiError(409, " User with this username or email already exists")
      }


    //   check that the images and avatar are present in the request

      const avatarLocalpath = req.files?.avatar[0]?.path;
      console.log(avatarLocalpath);

      const coverimageLocalpath = req.files?.coverimage[0]?.path
      
      if (!avatarLocalpath) {
        throw new ApiError(400,"Avatar file is required")
      }

     const avatar = await uploadonCloudinary(avatarLocalpath)
     const coverimage = await uploadonCloudinary(coverimageLocalpath)

     if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
     }
      
    //  remove password and refreshtoken from response

     await user.create({  // crate method is used 
        FullName,
        email,
        username : username.tolowercase(),
        password,
        avatar : avatar.url,
        coverimage : coverimage?.url || ""
     })
     const createduser =  await user.findById(user._id).select(
        "-password -refreshToken"
     )
     if (!createduser) {
        throw new ApiError(500, "Something went wrong while registering the user")
     }

    //  return response 

     return res.status(201).json(
        new ApiResponse(200, createduser, "User registered successfully")
     )
})  

export { registerUser }