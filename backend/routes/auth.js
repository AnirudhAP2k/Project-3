const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const router = express.Router();
const JWT_SECRET_TOKEN = "AnirudhPanwar2000";
let success = false;

//Route 1: Creating a user using POST method;
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Enter valid password of atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: errors.errors[0].msg})
    }
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
        return res.status(400).json({ success, error: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
    })
    const data = {
        user: newUser.id
    }
    let authToken = jwt.sign(data, JWT_SECRET_TOKEN);
    res.json({
        success: true,
        authToken
    });
    console.log(data, authToken);
})

//Route 2: Login a user using POST method;
router.post('/login', [
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, error: "Enter valid email" })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Please login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please login with correct credentials" });
        }

        const data = {
            user: user.id
        }
        let authToken = jwt.sign(data, JWT_SECRET_TOKEN);
        res.json({
            success: true,
            authToken
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send(success, "Internal Server Error")
    }
})

//Route 3: Get loggedin user details using POST method;
router.post('/getuser', fetchUser, async (req, res) => {
try{
    const userId = req.user;
    const user = await User.findById(userId).select("-password");
    res.send({success: true, user});
}catch (error) {
    console.error(error.message);
    res.status(500).send(success, "Internal Server Error")
}
})
module.exports = router;