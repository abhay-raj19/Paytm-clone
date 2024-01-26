const jwt = require('jsonwebtoken');
require('dotenv').config();


//middleware function for checking up the user is pre-logged in or not 
function authMiddleware(req,res,next) {
    //fetching up the authorisation token
    const authHeader = req.headers.authorisation;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1];

    try {
        const decodedValue = jwt.verify(token,process.env.JWT_SECRET);
        req.userId = decodedValue.userId;
        next(); 
    } catch (error) {
        console.log(error);
        return res.status(402).json({
            message:'JWT token verification fails up'   
        });   
    }


}

module.exports = {
    authMiddleware
};