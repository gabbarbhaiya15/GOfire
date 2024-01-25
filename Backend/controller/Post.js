const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();
const cloudinary = require('cloudinary').v2;
const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth')


router.post('/',auth,(req, res) => {
try{
    const {title,body,pic} = req.body;
    if(!title|| !body || !pic){
        return res.status(404).json({error: 'Not Found'});
}
console.log(req.user)
  const post = new PostModel({

    postedBy:req.user,
        title,
        body,
        pic,
        
       
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })
    
}

catch(error){

}


 })

 module.exports = router;
 