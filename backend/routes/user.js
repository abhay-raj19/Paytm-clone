//simply defined up a express-router for user endpoint
const express = require('express');
const zod = require('zod');
require('dotenv').config();
const jwt = require("jsonwebtoken");

const { User, Account } = require('../db');
const { authMiddleware } = require('../middlewares/middleware');

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

  await Account.create({
    userId,
    balance: Math.floor(Math.random() * 10000) + 1
  })
  
  //generating the jwt token for newly registered user

  const token =  jwt.sign({userId}, process.env.JWT_SECRET);

  // returned up the jwt token
  res.json({
      message:"User created Sucessfully",
      token:token
  })

});

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
})

//updating the specific imnpfmation 
userRouter.put('/update',authMiddleware, async (req,res) => {
    const { success,data } = updateBody.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message:'Error while updating the user info',
            errors: data.errors,
        })
    }
    try {
        const result = await User.updateOne({
            _id:req.userId
        },{
            $set:data
        })
        if (result.acknowledged && result.matchedCount===1) {
            return res.json({
                message: 'Updated successfully',
            });
        } else {
            return res.status(404).json({
                message: 'User not found or no changes made',
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message:'Internal Server Error'
        })
    }
});

userRouter.get('/bulk',async (req,res) => {
    const filterQuery = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filterQuery
            }
        }, {
            lastName: {
                "$regex": filterQuery
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username:user.username,
            firstName:user.firstName,
            lastName :user.lastName,
            _id:user._id
        }))
    })

})


module.exports = userRouter;