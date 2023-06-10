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
    "defly.io": {
        title: "Defly.io (All Games)",
        link: "defly.io",
        image: "https://defly.io/img/facebook-share.png",
        embedLink: "https://defly.io/"
    },
    "paper.io 2": {
        title: "Paper.io 2",
        link: "paper.io 2",
        image: "https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/d2708e8aa31df3fe7b211bca36405d6d.png",
        embedLink: "https://paper-io.com/"
    },
    "slope": {
        title: "Slope",
        link: "slope",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRibs2u9OXtqGIiG8tdQVbCGpmjqKZWXXi-Tw&usqp=CAU",
        embedLink: "https://kdata1.com/2020/05/slope/"
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
app.set('views', __dirname);

app.get('/', (req, res) => {
    res.render('index', {games: JSON.stringify(games), firebase: process.env.firebase})
})

app.get('/contact', (req, res) => {
    res.render('contact', {firebase: process.env.firebase})
})

app.get('/:game', (req, res) => {
    if (req.params.game in games) {
        res.render('game', {title: games[req.params.game]['title'], embed: games[req.params.game]['embedLink'], firebase: process.env.firebase})
    } else {
        res.render('404', {link: req.params.game, firebase: process.env.firebase})
    }
})

app.listen(port)
console.log("Server started at http://localhost:" + port)
