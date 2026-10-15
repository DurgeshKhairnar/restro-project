import User from '../db/authSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

console.log("SECRET:",process.env.ACCESS_TOKEN_SECRET ? "Found" : "Missing");

const verifyJWT = async(req,res,next) => {
    try{

        const token = req.cookies?.accessToken; 
    
        if(!token || token === undefined){
            return res.status(401).json({success:false,message:'Unauthorized'});
        }

        const verifyUser = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(verifyUser.id);

        if(!user){
            return res.status(401).json({message:'Invalid token user not found'})
        }

        req.user = user;

       return next();

    }catch (e){
        return res.status(500).json({message:'internal server error'});
    }
}

export default verifyJWT;