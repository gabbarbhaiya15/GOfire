const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// middleware


router.use(cookieParser());
module.exports = async (req,res,next) =>{
   
      const {token} =  await req.cookies;
      console.log(req.cookies);
   
      if(!token){
      return  res.status(401).json({message: 'Invalid token hein yaar'});
    
      }
      try{
        const  decodeds =  jwt.verify(token,'kkkjh')
        
     // res.send({user: decodeds});
     const Token =token;
      req.user = decodeds;
     next();
      
    
      }
      catch(error){
        res.clearCookie('token');
        return res.status(403).send({message: 'Invalid token'});
      }


  
  }
    