// updating profile pic of user
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const UserModel = require('../Modules/UserModel');
const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/Auth');

router.put('/', auth, async (req, res) => {
  try {
    let updateFields = {};

    if (req.body.profilepic) {
      updateFields.profilepic = req.body.profilepic;
    }

    if (req.body.coverpic) {
      updateFields.coverpic = req.body.coverpic;
    }

    const result = await UserModel.findByIdAndUpdate(
      req.user._id,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json("File upload successful");
  } catch (error) {
    res.status(400).json("Error in updating pic");
  }
});

module.exports = router;
