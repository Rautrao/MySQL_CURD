const express = require('express');
const app = express();
const db = require('./db.js');
const errorhandler=require('errorhandler');
require('dotenv').config();
//Importing router
const employeeRoutes = require('./controllers/employee-controller.js'); 

//middle ware for parsing
app.use(express.json());            

//middleware  //mounting the router
app.use('/api/employees',employeeRoutes);
//error handler middleware

if(process.env.NODE_ENV ===process.env.NODE_ENV){
    app.use(errorhandler());
} else{
    app.use((err,req,res,next)=>{
        console.log(err.stack || err); //log to server console
        res.status(err.status || 500).josn({
            success:false,
            message : "Internal server error"
        });
    });
}

//fist make sure db is connected
//then start the server
const PORT = process.env.PORT || 3000;
db.query("SELECT 1")
.then(()=>{
    console.log('db connection succeeded');
    app.listen(PORT,()=>{
        console.log(`Listening to server ${PORT}....`)
    });
})
.catch(err=>console.log('db connection failed.\n' + err));