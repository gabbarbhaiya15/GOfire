const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();

const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth');




router.put('/',auth,(req,res)=>{
  const {text,postId}= req.body;


    const comment = {
        text:text,
        postedBy: req.user._id,
    }
    console.log(comment)
    PostModel.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate('comments.postedBy', ' _id input ') // Populate postedBy with _id, input, and profilepic
    .populate('postedBy', '_id input ')
    .then((result)=>{
        res.json(result);

    })
    .catch((error)=>{
        console.log("error while making comment ");
    })
})


module.exports= router;