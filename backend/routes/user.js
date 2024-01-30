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
    balance: 1+ Math.random() * 10000
  })
  
  //generating the jwt token for newly registered user
  const token =  jwt.sign(userId , process.env.JWT_SECRET);

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
userRouter.put('/',authMiddleware, async (req,res) => {
    const { success } = updateBody.safeParse(req.body);
    if(!success){
        res.status(403).json({
            message:'Error while updating the user info',
        })
    }
    await User.updateOne(req.body,{
        _id:req.userId
    })

    res.json({
        message:'updated succesfully'
    }) 
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