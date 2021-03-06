const fs = require("fs");
const path = require("path");

const { v4: uuidv4 } = require('uuid');

// function to append a unique id to each new note
function createNewNote(body, notesArray) {
    const note = body;
     // add unique id to new note via uuid
    note.id = uuidv4();
    notesArray.push(note);

    // import and use the fs library to write copy of notes db to db.json
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )
    return note;
}

// function to confirm datatype of submits
function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    createNewNote,
    validateNote
};