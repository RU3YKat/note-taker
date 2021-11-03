const { notes } = require('./db/db.json');
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();



app.get('/api/notes', (req, res) => {
    console.log('Yup, it works!');
    let results = notes;
    if (req.query) {
        results = res.json(notes);
    }
    res.sendStatus(404);
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