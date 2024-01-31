// Main Routing file for all the specific routes.
const express = require('express');
//imported up that user-router file
const userRouter = require('./user');
const accountRouter = require('./account');



const router = express.Router();

//if the end point will have /user at last it will navigate to the userRouter.
//✅ user Routes Perfecly checked up 
router.use("/user",userRouter);
//if the end point will have /account at last it will navigate to the accountRouter.
//
router.use("/account",accountRouter);



module.exports=[
    router
]