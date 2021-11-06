const path = require('path');
const router = require('express').Router();


// add html route for get /notes 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// add html route for wildcard ('*') added LAST 
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;