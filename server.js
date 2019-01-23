const express = require('express');
const request = require('request');
const mustacheExpress = require('mustache-express');
const path = require('path');
const port = process.env.PORT || 8080;
const dotenv = require('dotenv');

console.log('Port: ' + port);

const app = express();

let env = dotenv.config().parsed;

if(env === undefined || env === null) env = process.env;
const HOST_API = env.API_URL || "";

let functions = {
    buildDataMustache: (req, title, description, image) => {
        let url = req.protocol + "://" + req.get('host') + req.originalUrl;
        return {
            url: url,
            title: title,
            description: description,
            image: image
        };
    },
    getYoutubeVideoId: (url) => {
        try{
            const REG_EXP = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
            let match = url.match(REG_EXP);
            return (match && match[7].length == 11) ? match[7] : false;
        } catch(e) {
            return false;
        }
    },
    buildMetaImageFromYoutubeID: (id) => {
        let image = "";
        if(id) {
            image = "https://img.youtube.com/vi/" + id + "/sddefault.jpg";
        }
        return image;
    }
};

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
    let url = HOST_API + '/api/characters/' + req.params.idPersonaje;
    request(url, { json: true }, (error, response, body) => {
        if(error) {
            res.render('mustache', defaultMustacheData);
            return;
        }
        let mustacheData = functions.buildDataMustache(req, body.name, body.name, body.url_picture);
        console.log(JSON.stringify(mustacheData));
        res.render('mustache', mustacheData);
    });
});

app.get('/clips/:idClip', (req,res) =>{
    let url = HOST_API + '/api/clips/' + req.params.idClip;
    request(url, { json: true }, (error, response, body) => {
        if(error) {
            res.render('mustache', defaultMustacheData);
            return;
        }
        let mustacheData = functions.buildDataMustache(req, body.title, body.title, functions.buildMetaImageFromYoutubeID(functions.getYoutubeVideoId(response.link)));
        res.render('mustache', mustacheData);
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port, '0.0.0.0');

console.log('App is listening on port ' + port);