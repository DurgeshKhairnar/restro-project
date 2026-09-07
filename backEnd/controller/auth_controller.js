import User from '../db/authSchema.js';



const options = {
    httpOnly:true,
    secure:true
}

const checkVerifyToken = async(req,res) => {
    res.status(200).json({message:'all is good'})
}


const registerUser = async(req,res) => {
    try{

        const { userName , password } = req.body;

        if([userName,password].some((i) => i?.trim() === '')){
           throw res.status(401).json({message:'plz fill the required feilds'})
        }

       const isExist = await User.findOne({userName})

       if(isExist){
          throw res.status(409).json({message:'userName allready exists'});
       }

       const user =  await User.create({
            userName, 
            password
       })

       const createUser = await User.findById(user._id).select('-password');

       if(!createUser){
          throw res.status(500).json({message:'some thing went worng'});
       }

       return res.status(201).json({
        message:'user successfully created',
        data:createUser,
    });

    }catch (e){
        console.log(`Error in register user ${e.message}`)
        return res.status(500).json({message:'Internal Server error'})
    }
}

const loginUser = async(req,res) => {
    try{

        const { userName , password } = req.body;

        if([userName,password].some((i) => i?.trim() === '')){
           throw res.status(401).json({message:'plz fill the required feilds'})
        }

        const user = await User.findOne({userName})

        if(!user){
             throw res.status(401).json({message:'User Name invalid'})
        }

        const isPosswordCorrect = await user.isPasswordCorrect(password);

        if(!isPosswordCorrect){
            throw res.status(401).json({message:'userName and password is invalid'})
        }

        const { accessToken , refreshToken } = await genrateAccessTokenRefreshToken(user._id);

        const loginUser = await User.findById(user._id).select('-password');

        console.log(`login user = ${loginUser}`)

        return res.cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .status(201).json({
            success:true,
            message:'Login success',
            user:loginUser,
            accessToken,
            refreshToken
        })

    }catch (e){
        console.log(`Error in login user ${e.message}`)
        return res.status(500).json({message:'Internal Server error'})
    }
}

async function genrateAccessTokenRefreshToken(id){
    try{
        const user = await User.findById(id);
        const refreshToken = await user.genrateRefreshToken();
        const accessToken = await user.genrateAccessToken();
        user.refreshToken = refreshToken;
        user.save({validateBeforeSave:false});
        return {accessToken , refreshToken}

    }catch (e){
       console.log(`error in genrateAccTokenRefrTon ${e.message}`)
    }
}


export default  { registerUser , loginUser , checkVerifyToken };    