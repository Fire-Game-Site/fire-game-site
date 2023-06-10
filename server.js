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
        image: "https://arsholde.sirv.com/Images/Untitled.jpg?w=209&h=177&scale.option=ignore",
        embedLink: "https://defly.io/"
    },
    "paper.io-2": {
        title: "Paper.io 2",
        link: "paper.io-2",
        image: "https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/d2708e8aa31df3fe7b211bca36405d6d.png",
        embedLink: "https://paper-io.com/"
    },
    "slope": {
        title: "Slope",
        link: "slope",
        image: "https://arsholde.sirv.com/Images/images.jpg",
        embedLink: "https://kdata1.com/2020/05/slope/"
    },
    "motox3m1": {
        title: "Moto X3M 1",
        link: "motox3m1",
        image: "",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/r3tq6l1/to9d2if10dv@cf85de94e37e2fdb071b8ef5c4f09623682e9955/f12ds3/motox3m.xml"
    },
    "motox3m2": {
        title: "Moto X3M 2",
        link: "motox3m2",
        image: "",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://840137492-163049537400263946.preview.editmysite.com/uploads/b/139890129-622598590552046666/files/mx3m2.xml"
    },
    "motox3m3": {
        title: "Moto X3M 3",
        link: "motox3m3",
        image: "",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://486017395-735910036185936427.preview.editmysite.com/uploads/b/139890129-378637188943279878/files/mx3m3.xml"
    },
    "motox3m-spookyland": {
        title: "Moto X3M Spooky Land",
        link: "motox3m-spookyland",
        image: "",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://318573026-162284027483016384.preview.editmysite.com/uploads/b/139890129-642750312748978757/files/mx3msl.xml"
    },
    "motox3m-winter": {
        title: "Moto X3M Winter",
        link: "motox3m-winter",
        image: "",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/r3tq6l1/to9d2if10dv@30dcfcb302cb76dee9d919a6ff87ee97b63efe7b/ue4d1w/moto-x3m-winter.xml"
    },
    "motox3m-poolparty": {
        title: "Moto X3M Pool Party",
        link: "motox3m-poolparty",
        image: "",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://649025137-174029463385024710.preview.editmysite.com/uploads/b/139890129-767696982876512205/files/mx3mpp.xml"
    },"game": {
        title: "game",
        link: "",
        image: "",
        embedLink: ""
    },
    "game": {
        title: "game",
        link: "",
        image: "",
        embedLink: ""
    },
    "game": {
        title: "game",
        link: "",
        image: "",
        embedLink: ""
    },"game": {
        title: "game",
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
