

const mongoose  = require('mongoose');
const express = require('express');
const cors = require('cors');
const router  =  express.Router();
const Usermodel = require('../Modules/UserModel');
const PostModel = require('../Modules/Modulepost');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

router.post('/', async (req, res) => {
    const { token } = req.query;
    const { password } = req.body;
 console.log({token})
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded:', decoded);
        const user = await Usermodel.findOne({Email: decoded.Email})
        console.log( user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
});
module.exports = router;