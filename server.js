const { notes } = require('./db/db');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

// let notesArray =[];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id === id) [0];
    return result;
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

function createNewNote(body, notesArray) {
    console.log(body);

    return body;
}

// GET notes array from path as json
app.get('/api/notes', (req, res) => {
    // notesArray = JSON.parse(notes);
    res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
    
});

// used to create routes to add notes to db
app.post('/api/notes', (req, res) => {
    notesArray = JSON.parse(notesArray);
   // set id based on what the next index of the array will be
   // WILL THIS WORK W/O EXISTING ID KEY PAIR???????
    req.body.id = animals.length.toString();
    
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});