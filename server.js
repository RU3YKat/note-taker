const { notes } = require('./db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

function filterByQuery(query, notesArray) {
    let notesTitleArray = [];
    let filteredResults = notesArray;
    if (query.notesTitle) {
        // save notesTitle as a dedicated array
        // if notesTitle is a string, place it into a new array and save
        if (typeof query.notesTitle === 'string') {
            notesTitleArray = [query.notesTitle];
        }
    } else {
        notesTitleArray = query.notesTitle;
    }
    // loop through each title in the notesTitle array
    notesTitleArray.forEach(title => {
        filteredResults = filteredResults.filter(
            note => note.notesTitle.indexOf(title) !== -1
        );
    });
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
}


app.get('/api/notes', (req, res) => {
    console.log('Yup, it works!');
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// used to create routes to add notes to db
app.post('/api/notes', (req, res) => {
    // req.body is location of incoming note data
    console.log(req.body);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});