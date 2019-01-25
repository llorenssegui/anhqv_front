const express = require('express');
const request = require('request');
const mustacheExpress = require('mustache-express');
const path = require('path');
const port = process.env.PORT || 8080;
const dotenv = require('dotenv');
const utils = require('./server_utils/utils.js');
console.log('Port: ' + port);

const app = express();

let env = dotenv.config().parsed;

if(env === undefined || env === null) env = process.env;
const HOST_API = env.API_URL || "";

const defaultMustacheData = {
    url: "https://anhqv-clips.herokuapp.com/",
    title: "Aqui No Hay Quien Viva Clips",
    description: "Aplicación que permite trasladar los mejores momentos con las voces de los diferentes personajes de la serie",
    image: "http://anhqv.es/wp-content/uploads/2016/10/31.jpg"
};

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/dist');

app.get('/personajes/:idPersonaje/clips', (req,res) =>{
    let url = HOST_API + '/characters/' + req.params.idPersonaje;
    request(url, { json: true }, (error, response, body) => {
        if(error) {
            res.render('mustache', defaultMustacheData);
            return;
        }
        let mustacheData = utils.buildDataMustache(req, body.name, body.name, body.url_picture);
        res.render('mustache', mustacheData);
    });
});

app.get('/clips/:idClip', (req,res) =>{
    let url = HOST_API + '/clips/' + req.params.idClip;
    request(url, { json: true }, (error, response, body) => {
        if(error) {
            res.render('mustache', defaultMustacheData);
            return;
        }
        let mustacheData = utils.buildDataMustache(req, body.title, defaultMustacheData.title, utils.buildMetaImageFromYoutubeID(utils.getYoutubeVideoId(body.link)));
        res.render('mustache', mustacheData);
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, '0.0.0.0');

console.log('App is listening on port ' + port);