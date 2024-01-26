//simply defined up a express-router for user endpoint
const express = require('express');
const zod = require('zod');
require('dotenv').config();
const jwt = require("jsonwebtoken");

const { User } = require('../db');

const userRouter = express.Router()

//vaidation of post-route payloads with Zod 
const signUpData = zod.object({
	username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

// post route for signup of users into the wallet
userRouter.post("/signup",async (req,res) => {
  const {success} = signUpData.safeParse(req.body);
  if(!success){
    return res.status(411).json({
        message:"Invalid inputs !! pls check once again"
    })
  } 
  //checking that user exist prior or not
  const existingUser = await User.findOne({
    username:req.body.username
  });
  
  if(existingUser){
    return res.json({
        message:'User already exists',
    })
  }
  // if not than create up a new user

  const newUser = await User.create({
    username: req.body.username,
	firstName: req.body.firstName,
	lastName: req.body.lastName,
	password: req.body.password,    
  });
   
  const userId = newUser._id;
  
  //generating the jwt token for newly registered user
  const token =  jwt.sign(userId , process.env.JWT_SECRET);

  // returned up the jwt token
  res.json({
      message:"User created Sucessfully",
      token:token
  })

});


module.exports = userRouter;