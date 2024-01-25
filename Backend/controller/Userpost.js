const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();

const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth')
router.get('/',auth,(req,res)=>{

PostModel.find({postedBy:req.user._id})
.populate("postedBy","_id input")
.populate("comments.postedBy","_id input profilepic ")
.then((post)=>{
    res.send(post);
})
.catch((error)=>{
    console.log("error in my post")
})


})
module.exports= router;
