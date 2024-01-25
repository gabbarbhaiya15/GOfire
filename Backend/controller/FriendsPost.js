// to see thge post of all user whom i follow in my news feed

const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();

const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth')



router.get('/' ,auth,async (req, res) => {
PostModel.find({postedBy:{$in:req.user.followings}})
.populate("postedBy","_id input")
.sort('-createdAt')
.then(post=>{
    res.json(post);
})
.catch((err)=>{
    console.log("error in all post")
})


})
module.exports = router;