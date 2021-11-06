const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
// middleware instructing server to make files in folder available
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});