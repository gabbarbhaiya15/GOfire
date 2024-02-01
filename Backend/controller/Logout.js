const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const JWTModel = require('../Modules/UserModel');
const jwt = require('jsonwebtoken');




router.get('/', (req, res) => {
  const { token } = req.cookies;

  try {
    // Set the 'Set-Cookie' header with an expired date and SameSite=None
    res.setHeader('Set-Cookie', `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;`);
    console.log("Manually deleting cookie");
    return res.status(200).json({ message: 'Logout successful' });
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;

module.exports= router;
