const express = require('express');
const request = require('request');
const path = require('path');
const port = process.env.PORT || 8080;

const app = express();

const HOST = "https://warm-plateau-81725.herokuapp.com/api";

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/characters', (req, res) => {
    request(HOST + '/characters?format=json', { json: true }, function(error, response, body) {
        res.json(body)
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port);

console.log('App is listening on port ' + port);