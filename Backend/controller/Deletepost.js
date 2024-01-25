const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();

const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth')



router.delete('/:postId',auth, async (req,res)=>{
    const id  = req.params.postId;
    console.log(id)
 await   PostModel.findById(id)
.populate("postedBy","_id")
.then((post)=>{
    console.log(post)
    console.log(post.postedBy._id.toString())
    console.log(req.user._id)
    if(post.postedBy._id.toString() === req.user._id){
     PostModel.findOneAndDelete(req.params.postId)
        .then((result)=>{res.json("deleted successfully");})
        .catch((error)=>{res.status(403).json("error in removing post")  });
    }
    else{
       res.status(403).json("error");
    }
})
.catch((error)=>{res.status(400).json("error in finding post")});


})
module.exports = router;