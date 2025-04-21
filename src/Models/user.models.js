import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type :String,
        required : true,
        lowercase : true,
        trim : true,
        unique :true,
        index: true  
    },
    email : {
        type :String,
        required : true,
        lowercase : true,
        unique :true,
    },
    FullName : {
        type :String,
        required : true,
        trim : true,
        index : true,
    },
    avatar : {
        type : String,
        required : true,
    },
    coverimage : {
        type : String
    },
    watchHistory :[
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password :{ 
        type : String,
        required : [true, "Password is required"]
    },
    refreshToken : {
        type : String
    }
},{ timestamps :true})

// Check that password is not updated many times 

userSchema.pre("save", async function (next) {
    if(!this.ismodified("password")) return next()

    this.password = bcrypt.hash(this.password,10)
    next()
})

//compare password with user and databse password

userSchema.methods.isPasswordCorrect =async function (password){
  return await bcrypt.compare(password, this.password)
}

//Tokens added to the user schema
//That is syntax for crating a token



userSchema.methods.generateAccessToken =function () {
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username, 
            FullName : this.FullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//same as above but for refresh token

userSchema.methods.generateRefreshToken =function () {
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const user = new mongoose.model("User",userSchema)