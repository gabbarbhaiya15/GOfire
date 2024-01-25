const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();

const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth');


 


router.put('/',auth, (req,res)=>{
PostModel.findByIdAndUpdate(req.body.postId,{
    $addToSet:{likes:req.user._id}
    },{new:true}
).then((Result)=>{
        res.json(Result)
    })
    .catch((err)=>{console.log("error in like ")})
})

module.exports= router;