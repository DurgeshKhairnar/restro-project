import mongoose from '../connect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        unique: true,
        required:true
    },
    password : {
        type: String,
        required:true
    },
    refreshToken : {
        type:String
    }
},{
    timestamp:true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next;

    this.password = await bcrypt.hash(this.password,10);
    next;
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.genrateAccessToken = function(){
   const accessToken =  jwt.sign(
        {
            id : this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }

    )
    console.log(` jwt accessToken = ${accessToken}`)
    return accessToken;
}

userSchema.methods.genrateRefreshToken = function(){
  return  jwt.sign(
        {
            id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}


const User = mongoose.model('user_auth',userSchema);

export default User;