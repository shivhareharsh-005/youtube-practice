
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
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

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password, 10);
    
    
})



const User = model.Schema("User", userSchema);

export default User;