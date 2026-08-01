
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import User from "../models/user.models.js"
import cookieParser from "cookie-parser"


const generateAccessAndRefreshToken = async(userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave : false});

        return {accessToken , refreshToken};
    } catch (error){
        throw new ApiError(500, "Something went wrong");
    }
}

const register = asyncHandler( async(req, res)=>{

    //user details lena 
    const {fullName, username, email, password} = req.body;
    
    // fields required 
    if(!username || !email || !password){
        throw new ApiError(400, "All fields are required");
    }
    // existing user
    const existingUser = await User.findOne({
        $or : [
            {username},
            { email }
        ]
    });
    if(existingUser){
        throw new ApiError(409, "User already exists")
    }

    // user created 
    const user = await User.create({
        fullName,
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id)
    .select("-password -refreshToken")

     if(!createdUser){
        throw new ApiError(500, "Something went wrong on registring user");
     }

    return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            createdUser,
            "User registerd successfully"
        )
    )
})

const loginUser = asyncHandler( async(req, res) => {

    // login details
    const { username, email, password } = req.body;
    
    // check field emplty
    if(!(username || email) ){
        throw new ApiError(400, "username or email is required");
    }

    //search user
    const user = await User.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    if(!user){
        throw new ApiError(404, "Not found")
    }
    
    // check password
    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401, "Unauthorized access")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken,
                refreshToken
            },
            "user loggedIn successfully"
        )
    )

})


const logoutUser = ( async (req, res) => {
      await User.findByIdAndUpdate(
        req.user._id,
        {
            $set : {
                refreshToken : undefined
            }
        },
        {
            new : true
        }
    )
    const options = {
        httpOnly,
        secure : process.env.NODE_ENV === "production"
    }

    return res
    .status(200)
    .cookie("accessToken", options )
    .cookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User loggedout successfully"))
})