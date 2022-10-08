const User = require("../model/user.js");
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
const bcrypt = require('bcrypt') 

dotenv.config();

const register = async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser= new User({
            username:req.body.username,
            password:hash
        })
        await newUser.save();
        console.log(newUser);
        res.status(200).send(newUser);
    }
    catch(err){
        next(err);
    }
}

const login = async (req,res,next)=>{
    try{
        const user = await User.findOne({username:req.body.username})
        if(!user){
            return next(createError(404,"User does not exsist"));
        }
        const isPassword = await bcrypt.compare(req.body.password,user.password);
        if(!isPassword){
            return next(createError(400,"Wrong Password"));
        }

        const token= jwt.sign({id:user._id},process.env.JWT)
        const {password,...otherDetails}= user._doc;
        res.cookie(
            "access_token",
            token,{
                httpOnly:true,
            }).status(200).json({ details:{...otherDetails},token});

    }catch(err){
        next(err);
    }
}
const logout = async (req,res,next)=>{
    try{
        
    }
    catch(err){
        next(err);
    }
}
module.exports={login,register,logout}