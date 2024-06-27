import User from "../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//user registration
export const register = async (req,res)=>{
    try{
        //hashing password
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password,salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            photo: req.body.photo,
        })

        await newUser.save()
        res.status(200).json({success:true,message:'successfully created'});
        console.log("success")
    }catch(err){
        res.status(500).json({success:false,message:'failed to create user'});
        console.log(err)
    }
}

//user login
export const login = async(req,res)=>{
    const email = req.body.email
    try{
        const user = await User.findOne({email})
        //if user not exist
        if(!user){
            return res.status(404).json({seccess:false,message:'not found'})
        }
        //check password
        const checkPassword =await bcrypt.compare(req.body.password, user.password)

        //if not match
        if(!checkPassword){
            return res.status(404).json({seccess:false,message:'incorrect email or password'})
        }
        const {password,role, ...rest} = user._doc

        //jwt token
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET_KEY,{expiresIn:'15d'})

        //set token cookies and the rsponse to client
        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200)
        .json({success:true,message:'login successfully',token,role,data:{...rest}})

    }catch(err){
        return res.status(500).json({seccess:false,message:'login failed'})
    }
}