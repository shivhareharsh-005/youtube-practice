
import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        trim : true
    }, 
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true,
    },
    about : {
        type : String
    },
    avatar : {
        type : String
    },
    coverImage : {
        type : String
    }
},
{
    timestamps : true
})

//  password incription middleware....
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 10); 
})

//   password matvhing method
userSchema.methods.isPasswordCorrect = async function (password) {
    return bcrypt.compare(
      password,
      this.password
    )
}

// generate access token ....
userSchema.methods.generateAccessToken = async function () {
    jwt.sign(
        // payload
        {
           _id : this._id,
           email : this.email,
           username : this.username,
           fullName : this.fullName
        },
        // secret key
        process.env.ACCESS_TOKEN_SECRET,
        // token expiry
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}

userSchema.methods.generateRefreshToken = async function () {
    jwt.sign(
        // payload
        {
            _id = this.id
        },
        // secret key

        process.env.REFRESH_TOKEN_SECRET,

        // token expiry

        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
} 


const User = model.Schema("User", userSchema);

export default User;