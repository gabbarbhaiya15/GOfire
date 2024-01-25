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
PostModel.find()
.populate("postedBy","_id input profilepic ")
.populate("comments.postedBy","_id input profilepic ")
.sort('-createdAt')
.then(post=>{
    res.json(post);
})
.catch((err)=>{
    console.log("error in all post")
})


})
module.exports = router;