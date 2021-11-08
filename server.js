const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// use designated routes for fetches
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// start port with success message
app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});