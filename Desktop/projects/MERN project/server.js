const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser")
const path = require('path');
//dotenv config
dotenv.config();


//momgo db connection
connectDB();

//rest object 
const app = express();

//middle ware
app.use(express.json());   //body parser
app.use(cookieParser())


//static files
app.use(express.static(path.join(__dirname,'./client/build')))
 
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname ,'./client/build/index.html'))
});

//routes
app.use('/api/v1/user',require('./routes/userrRoutes'))
app.use('/api/v1/admin' ,require('./routes/adminRoutes'))
app.use('/api/v1/doctor',require('./routes/doctorRouter'))
// port 
const port = process.env.PORT || 8080;

//LISTen
app.listen(port,()=>{
    console.log(`server Running in ${process.env.NODE_MODE}  mode on port ${process.env.PORT}`.bgCyan);
})