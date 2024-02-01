const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const JWTModel = require('../Modules/UserModel');
const jwt = require('jsonwebtoken');

    

router.get('/', async (req,res)=>{
const {token} = req.cookies;


try{
res.clearCookie('token');
    console.log("logging out here ")

return res.status(200).json({message: 'Logout successful'})
}
catch(err){
return res.status(400).send({message: err.message});
}

})
module.exports= router;
