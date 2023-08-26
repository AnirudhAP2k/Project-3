const express = require('express');
const fetchUser = require("../middleware/fetchUser");
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//Route 1: Get all the notes of the user using GET method;
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user })
        res.json({"Notes": notes});
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error")
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
        return res.status(500).send("Internal Server Error")
    }
})

//Route 3: Update of notes for logged in user using PUT method;
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const {title, description, tag} = req.body;
        const newNote = {title, description, tag};
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }
    
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send({error: "Not Found"});
        }
        if(note.user.toString() !== req.user){
            return res.status(401).send({error: "Not Allowed"});
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        return res.json(note);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({error: "Internal Server Error"});
    }
})

//Route 4: Delete of notes for logged in user using DELETE method;
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send({error: "Not Found"});
        }
        if(note.user.toString() !== req.user){
            return res.status(401).send({error: "Not Allowed"});
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        return res.send({"Success": "Note Deleted Successfully", "Note": note});
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({error: "Internal Server Error"});
    }
})
module.exports = router;