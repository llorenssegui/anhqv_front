const express = require('express');
const request = require('request');
const path = require('path');
const port = process.env.PORT || 8080;

console.log('Port: ' + port);

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, '0.0.0.0');

console.log('App is listening on port ' + port);