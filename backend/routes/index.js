// Main Routing file for all the specific routes.
const express = require('express');
//imported up that user-router file
const userRouter = require('./user')


const router = express.Router();
//if the end point will have /user at last it will navigate to the userRouter.
router.use("/user",userRouter)



module.exports=[
    router
]