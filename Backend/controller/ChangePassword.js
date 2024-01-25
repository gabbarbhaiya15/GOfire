const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();
const JWTModel = require('../Modules/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const PasswordReset = require('../Modules/PasswordReset');



// change  password  or foret password





 router.put('/', async (req,res)=>{
    //  change password 
    
try{
    console.log('change password');
    const {id} = req.params;
    const {YourEmail,Oldpassword,NewPassword} = req.body;
     const user = await JWTModel.findOne({Email:YourEmail})
        if(user){
            if( bcrypt.compare(Oldpassword, user.password)){
                const encryptedpassword = await  bcrypt.hash(NewPassword , 10);
                const  users = await   JWTModel.findByIdAndUpdate(
                   {_id:id},
                   {password:encryptedpassword },
                   {new:true,useFindAndModify:false}
                );  
        }
    }
    else{
        const  message = " invalid password  reset link ";
        console.log( "changing password  fails")
    }





}
catch(error){
console.log("changing password api is not running  ")
}

}) 
module.exports= router;