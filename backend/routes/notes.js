const express = require('express');
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

//Route 1: Get all the notes of the user using GET method;

router.get('/fetchallnotes', fetchUser, (req, res)=>{

    res.json([]);
})

module.exports = router;