const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL)

//created up the schema for storing up the user into the database.

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    } , 
    lastName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,

    }
});
//Used the above defined schema for creating up the specific mogoose model.
const User = mongoose.model("User",userSchema);

//exported up the User model.
module.exports= {
    User
}