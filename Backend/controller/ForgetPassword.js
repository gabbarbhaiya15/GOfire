const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();
const UserModelModel = require('../Modules/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
var Mailer = require('nodemailer'); 


router.post('/',async (req,res) =>{
try{
    const {email} = req.body;
    const user  = await JWTModel.findOne({Email: email});
    if(user){
     var transportar = Mailer.createTransport({

service:"gmail",
auth:{
    user:"bhardasona@gmail.com",
    pass:"9415547403"
}




     });
 var mailOptions = {
    from:"bhardasona@gmail.com",
    to: user.Email,
    subject:"Email subject",
    text: user.password,
 }

 // send email
  transportar.sendMail(mailOptions, (error, info) =>{
    if(error) console.log(error);
    console.log(info);
  });

    }





}
catch(error){
    console.log("Forget password api is not running")
}



})