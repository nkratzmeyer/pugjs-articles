//index.js
const express = require('express');
// Some dummy data that we will pass to our pug templates
const userNames = ['Sean', 'George', 'Roger', 'Timothy', 'Pierce', 'Daniel']
const bestMovie = 'Casino Royale';
const licensedToKill = true;

// Set up express as usual
const app = express();
// Tell express that we are using Pugjs as our view engine
app.set('view engine', 'pug');

// GET route for home page
app.get('/', (req, res) => {
    // the below usage of render illustrates passing data to the view engine for use in pages
    res.render('index', {
        userNames,
        bestMovie,
        licensedToKill,
        title : "Home Page"
    });
});

// GET route for about page
app.get('/about', (req, res) => {
    // the below usage of render illustrates passing data to the view engine for use in pages
    res.render('about', {
        userNames,
        title : 'About'
    });
});

app.listen(3000, () => {
    console.log('Server listening on 3000');
});