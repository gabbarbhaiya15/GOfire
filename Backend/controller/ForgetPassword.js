const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const UserModel = require('../Modules/UserModel'); // Ensure correct model is imported
require('dotenv').config(); // Use environment variables

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ Email: email })
         if (user) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const resetToken = jwt.sign({ id: user._id, Email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const resetLink = `http://localhost:3000/Resetpassword?token=${resetToken}`;

            const mailOptions = {
                from: process.env.EMAIL_FROM,
                to: user.Email,
                subject: 'Password Reset Request',
                text: `Please click the following link to reset your password: ${resetLink}`
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: 'Password reset email sent successfully.' });
        } else {
            return res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        console.error("Forget password API encountered an error:", error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = router;
