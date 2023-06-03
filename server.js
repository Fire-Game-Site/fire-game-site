const express = require("express")
const path = require("path")
const mustache = require('mustache-express');
const app = express()
const port = 8080

var games = {
    "papas-freezeria": { // type the link, same as below, of the game here
        title: "Papa's Freezeria", // type the title of the game here
        link: "papas-freezeria", // the title but with link friendly, so no spaces or symbols
        image: "https://th.bing.com/th/id/OIP.52nSt-_9qvnIJd4vJoOQqwHaEo?pid=ImgDet&rs=1", // type the link to the cover image here
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fpapa-s-freezeria.xml" // type the iframe embed link here
    },
    "2nd game": {
        title: "2nd game",
        link: "",
        image: "",
        embedLink: ""
    },
    "3rd game": {
        title: "3rd game",
        link: "",
        image: "",
        embedLink: ""
    },
    "4th game": {
        title: "4th game",
        link: "",
        image: "",
        embedLink: ""
    },
    "5th game": {
        title: "5th game",
        link: "",
        image: "",
        embedLink: ""
    },
    "6th game": {
        title: "6th game",
        link: "",
        image: "",
        embedLink: ""
    },
}

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', './');

app.get('/', (req, res) => {
    res.render('index', {games: JSON.stringify(games)})
})

app.get('/:game', (req, res) => {
    if (req.params.game in games) {
        res.render('game', {title: games[req.params.game]['title'], embed: games[req.params.game]['embedLink']})
    } else {
        res.render('404', {link: req.params.game})
    }
})

app.listen(port)
console.log("Server started at http://localhost:" + port)