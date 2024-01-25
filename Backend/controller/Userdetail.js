
const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();
const Usermodel = require('../Modules/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/Auth')
const cookieParser = require('cookie-parser');

router.use(cookieParser());
router.get('/', auth,async(req,res)=>{
    Usermodel.findOne({_id: req.user._id})
    .then((result)=>{
        res.json({result})
    })
    .catch((err)=>{
        console.log("error in userdetail")

    });
} )
module.exports = router;