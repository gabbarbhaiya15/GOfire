
const express = require('express');
const mongoose  = require('mongoose');
const  bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const Usermodel = require('../Modules/UserModel');
const router = express.Router(); 





router.post( '/' ,async (req,res)=>{
    console.log('Register')
    const {input, password,Email} = req.body;
    await Usermodel.findOne({Email})
    .then((user)=>{res.status(400).json({message:"email already registered"})});
    // encrypt password 

    const encryptedpassword = await  bcrypt.hash(password , 10)
    const user = await  Usermodel.create({input, password : encryptedpassword,Email})
 console.log(user);
    const  token  = await jwt.sign({id: user._id, input: user.input,Email:user.Email},'kkkjh',{expiresIn:'30d'});
    
    console.log(token)
user.token = token
user.password = undefined;

  })
   module.exports =  router;