const fs = require('fs');
const path = require('path');

const { notes } = require('./db/db.json');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware instructing server to make files in folder available
app.use(express.static('public'));


// GET notes array from path as json
app.get('/api/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db/db.json'));
    res.json(data);
});

// may be useless...uuid is too complicated to search for directly... 
// likely better to search by title
// app.get('/api/notes/:id', (req, res) => {
//     const result = findById(req.params.id, notes);
//     if (result) {
//         res.json(result);
//     } else {
//         res.send(404);
//     }
// });

// used to create routes to add notes to db
app.post('/api/notes', (req, res) => {
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

// add html route for get /notes 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// add html route for wildcard ('*') added LAST 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});