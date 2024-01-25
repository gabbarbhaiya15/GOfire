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
    console.log('unfollowing');
    console.log(req.body.unfollowid);
    const id = req.body.unfollowid;

    try {
        // Update the followed user's followers list
        const updatedUser = await UserModel.findByIdAndUpdate(
            id,
            { $pull: { follower: req.user._id } },
            { new: true }
        );

        // Update the current user's followings list
        const currentUser = await UserModel.findByIdAndUpdate(
            req.user._id,
            { $pull: { followings: req.body.unfollowid } },
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
