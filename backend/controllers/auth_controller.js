const authModel = require('../models/auth_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const addUser = async(req,res) => {
    const {username,password,email,role} = req.body;

    try {
        if(!username||!password||!email||!role){
            return res.status(400).json({message:"All fields are mandatory!"});
        }

        const findMail = await authModel.findOne({email});
        if(findMail){
            return res.status(400).json({message:"Email already registered!"});
        }

        const findUsername = await authModel.findOne({username});
        if(findUsername){
            return res.status(400).json({message:"Username already registered!"});
        }

        const hashedPassword = await bcrypt.hash(password,16);
        const newUser = new authModel({username,email,password:hashedPassword,role});
        const user = await newUser.save();
        if(!user){
            return res.status(400).json({message:"Error while saving user!"});
        }

        return res.status(201).json({message:"User registered Successfully!"});
    } catch (error) {
        return res.status(400).json({message:"Error Occured!"});
    }
}

const loginUser = async(req,res)=>{
    const {email,password} = req.body;

    try {
        if(!email||!password){
            return res.status(400).json({message:"All fields are mandatory!"});
        }

        const findMail = await authModel.findOne({email});
        if(!findMail){
            return res.status(400).json({message:"Email is not registered with us yet!"});
        }

        const checkPassword = await bcrypt.compare(password,findMail.password);
        if(!checkPassword){
            return res.status(400).json({message:"Email or Password are incorrect!"});
        }

        const token = jwt.sign(email,process.env.JWT_SECRET);
        if(!token){
            return res.status(400).json({message:"Error Occured!"});
        }

        const user = await authModel.findOne({email},{password:0,createdAt:0,updatedAt:0,__v:0});

        return res.status(200).json({message:"User Logged in Successfully!",user:user,token:token});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"Error Occured!"});
    }
}

module.exports = {
    addUser,
    loginUser
}