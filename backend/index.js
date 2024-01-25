const express = require("express");
const cors = require('cors')
require('dotenv').config()
const rootRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
console.log(process.env.JWT_SECRET);

//Routed up the main route i.e "api/v1" with rootRouter
app.use("api/v1",rootRouter)



app.listen(process.env.PORT,()=>{
    console.log(`Server changa at port ${process.env.PORT}`);
})

