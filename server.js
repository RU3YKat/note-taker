const fs = require('fs');
const path = require('path');

const { notes } = require('./db/db');
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware instructing server to make files in folder available
// app.use(express.static('public'));

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id) [0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
     // add unique id to new note via uuid
    note.id = uuidv4();
    notesArray.push(note);

    // import and use the fs library to write copy of notes db to notes.json
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// perhaps this doesn't work bc the titles are NOT in an array
// function filterByQuery(query, notesArray) {
//     let notesTitleArray = [];
//     let filteredResults = notesArray;
//     if (query.notesTitle) {
//         // save notesTitle as a dedicated array
//         // if notesTitle is a string, place it into a new array and save
//         if (typeof query.notesTitle === 'string') {
//             notesTitleArray = [query.notesTitle];
//         }
//     } else {
//         notesTitleArray = query.notesTitle;
//     }
//     // loop through each title in the notesTitle array
//     notesTitleArray.forEach(title => {
//         filteredResults = filteredResults.filter(
//             note => note.notesTitle.indexOf(title) !== -1
//         );
//     });
//     if (query.text) {
//         filteredResults = filteredResults.filter(note => note.text === query.text);
//     }
//     return filteredResults;
// }

// GET notes array from path as json
app.get('/api/notes', (req, res) => {
    // notesArray = JSON.parse(notes);
    res.json(notes);
});

// may be useless...uuid is too complicated to search for directly... 
// likely better to search by title
app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

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

// add html routes from root ('/')
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});