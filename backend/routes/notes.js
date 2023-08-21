const express = require('express');
const fetchUser = require("../middleware/fetchUser");
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//Route 1: Get all the notes of the user using GET method;
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

//Route 2: Post all the notes of the logged in user using POST method;
router.post('/addnote', fetchUser, [
    body('description', 'Enter a atlest 5 characters').isLength({ min: 5 }),
    body('title', 'Enter a valid title').isLength({ min: 1 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const newNote = new Notes({
            title, description, tag, user: req.user
        })
        const saveNote = await newNote.save();

        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router;