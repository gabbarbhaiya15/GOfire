const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const JWTModel = require('../Modules/UserModel');
const jwt = require('jsonwebtoken');

    

router.get('/', async (req,res)=>{
const {token} = req.cookies;

console.log("logging out here ")
console.log(token);
try{
res.clearCookie('token');
console.log(token)
return res.status(201).json({message: 'Logout successful'})
}
catch(err){
return res.status(400).send({message: err.message});
}

})
module.exports= router;