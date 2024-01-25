
const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();
const Usermodel = require('../Modules/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
router.post( '/',async (req,res)=>{
    try{
      const {LEmail, Lpassword} = req.body;
    
      const user = await Usermodel.findOne({Email: LEmail})
    
      
      
      if(user){
      
        if( bcrypt.compare(Lpassword, user.password)){
         // sendverficationEmail(user,res)
         console.log(user.input)
          const token = jwt.sign({_id: user._id, input: user.input,Email: LEmail,follower:user.follower,followings:user.followings, profilepic:user.profilepic},'kkkjh',{expiresIn:"1y"});
          
      
         
      
          
          
          res.status(200)
          .cookie('token', token, {httpOnly:true , expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                                  secure: true, // recommended for security, set to true in production when using HTTPS
          sameSite: 'None',
                                  
                                  })
          .send({
           success : true,
           token: token,
         
           user
      
          }) 
          
      
        }
      }
      
      
    
    }
    catch(e){console.log(e)}
    
    })
    module.exports = router;
