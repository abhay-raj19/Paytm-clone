const express = require('express');
const { authMiddleware } = require('../middlewares/middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

// created up a seprate router to handle all account realted endpoints
const accountRouter = express.Router();

//end point to fetch up the current account balance
accountRouter.get('/balance',authMiddleware,async(req,res)=>{
    const account = await Account.findOne({
        userId: req.userId
    });
    res.json({
        balance : account.balance
    });

});

//end-point to perform a transaction between sender and reciever(without using Transaction in mongoDB)

// accountRouter.post('/transfer',authMiddleware,async(req,res)=>{
//     const { amount , to } = req.body;
//     const account = await Account.findOne({
//         userId: req.userId
//     });
    
//     if(account.amount<amount){
//         return res.status(400).json({
//             message:"Insufficent Balance To Transfer"
//         });
//     }

//     const toAccount = await Account.findOne({
//         userId: to
//     });

//     if(!toAccount){
//         return res.status(400).json({
//             message:"Invalid Account to Transfer"
//         });
//     }
//     await Account.updateOne({
//         userId:req.userId
//     },{
//         $inc:{
//             balance:-amount
//         }
//     });
//     await Account.updateOne({
//         userId:to
//     },{
//         $inc:{
//             balance:amount
//         }
//     });
//     res.json({
//         message:"Transfer Successful"
//     });

// });

//using Transactions in MONGODB by implementing ACID.

accountRouter.post('/transfer',authMiddleware,async(req, res )=>{
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount , to} = req.body;
     
    //finding the account within the sessino
    const account = await Account.findOne({userId:req.body}).session(session);

    //if any of the condition fails up abort the whole transaction.
    if(!account || account.balance<amount){
        await session.abortTransaction();
        console.log("Insufficient balance")
        return res.status(400).json({
            message:"Transaction failed, insuffucient balance"
        });
    }

    //finding the reciever is a genuine user, that exists in the database or not within session .
    const toAccount = await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        console.log("Invalid Account");
        return res.status(400).json({
            message:"Invalid Account"
        });
    }

    //performing up the transactions.
    await Account.updateOne({userId:req.body},{$inc:{balance: -amount }}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    //commit up the transactions
    await session.commitTransaction();
    console.log("done");
    res.json({
        message:"Transfer Successful"
    });
    

    // transfer({
    //     userId: "65ac44e10ab2ec750ca666a5",
    //     body: {
    //         to: "65ac44e40ab2ec750ca666aa",
    //         amount: 100
    //     }
    // })
    
    // transfer({
    //     userId: "65ac44e10ab2ec750ca666a5",
    //     body: {
    //         to: "65ac44e40ab2ec750ca666aa",
    //         amount: 100
    //     }
    // })
});



module.exports= accountRouter;