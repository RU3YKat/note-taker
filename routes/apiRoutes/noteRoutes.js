const fs = require('fs');
const router = require('express').Router();

const { validateNote, createNewNote } = require('../../lib/notes');
const { notes } = require('../../db/db');

// GET notes array from path as json
router.get('/notes', (req, res) => {
    // let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes);
});

// used to create routes to add notes to db
router.post('/notes', (req, res) => {
  // if data in req.body is incorrect, return 400 error
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.')
    } else {
    // access new note string in POST request
    const note = createNewNote(req.body, notes);

    // send json response
    res.json(note);
    }
});

module.exports = router;