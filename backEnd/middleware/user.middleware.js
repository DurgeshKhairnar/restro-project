import User from '../db/authSchema.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

console.log("SECRET:",process.env.ASSESS_TOKEN_SECRET ? "Found" : "Missing");

const verifyJWT = async(req,res,next) => {
    try{

        const token = req?.cookies?.accessToken;

        

        if(!token){
            throw res.status(404).json({message:'token not found'});
        }

         console.log("SECRET:", process.env.ASSESS_TOKEN_SECRET  ? "Found" : "Missing");
    
        const verifyUser = jwt.verify(token,process.env.ASSESS_TOKEN_SECRET);

        console.log(`acce ==== ${jwt.verify(token,process.env.ASSESS_TOKEN_SECRET)}`)

        console.log(`verifyUser ==== ${verifyUser._id}`)

        const user = await User.findById(verifyUser._id);

        console.log(`user in verify ${user}`)

        if(!user){
            throw res.status(401).json({message:'Invalid token user not found'})
        }

        req.user = user;

        next();

    }catch (e){
        console.log(`error in verifyjwt ${e.message}`);
        return res.status(500).json({message:'internal server error'});
    }
}

export default verifyJWT;