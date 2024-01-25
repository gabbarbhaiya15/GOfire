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
    console.log('following');
    console.log(req.body.followid);
    const id = req.body.followid;

    try {
        // Update the followed user's followers list
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $addToSet: { follower: req.user._id } },
            { new: true }
        );

        // Update the current user's followings list
        const currentUser = await UserModel.findByIdAndUpdate(
            req.user._id,
            { $addToSet: { followings: req.body.followid } },
            { new: true }
        ).select("-password");

        res.json({
            updatedUser: updatedUser,
            currentUser: currentUser
        });
        
    } catch (err) {
        return res.status(422).json({ error: err.message });
    }
});

module.exports = router;
