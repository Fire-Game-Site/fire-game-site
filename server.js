const express = require("express")
const path = require("path")
const mustache = require('mustache-express')
const app = express()
const port = 10000
const lunr = require("lunr")
const games = require("./games.json")
const res = require("express/lib/response");

var announcement = { // both support html, so if you want something like a link use <a> or if you want a newline use <br />
    title: "Anouncements",
    description: "Make sure to SUBSCRIBE to our <a href='https://youtube.com/@firegames52123?si=tdwqa6Hx4Emqtfbb'>YouTube Channel!</a> <br />  <br />December 4, 2023: A search bar feature has been added! Make sure to check it out! Note that this feature is brand new and in a testing phase. Contact us if it causes you problems and our support team will reach out to you!<br />  <br />New Games:<br /><ul><li><a href='/madalinstuntcars2'>Madalin Stunt Cars 2</a></li><li><a href='/tetris'>Tetris</a></li><li><a href='/penaltykickonline'>Penalty Kick Online</a></li><li><a href='/raftwars2'>Raft Wars 2</a></li><li><a href='/fnaf'>FNAF</a></li><li><a href='/mrmine'>Mr Mine</a></li></ul>"
}

// index lunr
var wildcardGenerator = function (token) {
    return new lunr.Token(`*${token.str}*`);
};
lunr.Pipeline.registerFunction(wildcardGenerator, 'wildcardGen')
const idx = lunr(function () {
    this.ref('id')
    this.field('name')

    for (const i in games) {
        this.add({id: i, name: games[i].title, text: games[i].description, developer: games[i].props.Developer})
    }

    this.pipeline.add(wildcardGenerator)
})

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname);

app.get('/', (req, res) => {
    res.render('index', {games: JSON.stringify(games), firebase: process.env.firebase, title: announcement.title, desc: announcement.description})
})

app.get('/ads.txt', (req, res) => {
    res.send('google.com, pub-2261681163241464, DIRECT, f08c47fec0942fa0')
})

app.get('/sitemap.txt', (req, res) => {
    let sitemap = 'https://firegamesite.com/\nhttps://firegamesite.com/privacy-policy\nhttps://firegamesite.com/contact\n'
    for (const i in games) {
        sitemap += `https://firegamesite.com/${i}\n`
    }
    res.send(sitemap)
})

app.get('/robots.txt', (req, res) => {
    res.send('');
})

app.get('/privacy-policy', (req, res) => {
    res.render('md', {title: "Privacy Policy"})
})

app.get('/contact', (req, res) => {
    res.render('contact', {firebase: process.env.firebase})
})

app.get('/:game', (req, res) => {
    if (req.params.game in games) {
        if (!!games[req.params.game]['props']) {
            var propsBool = `<div style="width: 100%; height: 3px; border-radius: 1.5px; background: #FFFFFF;" ></div>`
            let propsList = ``
            for (const i in games[req.params.game]['props']) {
                propsList += `<p style="padding: 10px; box-sizing: border-box; color: #FFFFFF; text-align: center; font-family: Poppins, system-ui; font-size: 20px; font-weight: 600;">${i}: ${games[req.params.game]['props'][i]}</p>`
            }
            var props = `<div style="display: flex; padding: 10px; justify-content: center; align-items: center; align-content: center; gap: 15px; box-sizing: border-box; width: 100%; flex-wrap: wrap;">${propsList}</div>`
        }
        if (!!games[req.params.game]['description']) {
            var descBool = `<div style="width: 100%; height: 3px; border-radius: 1.5px; background: #FFFFFF;" ></div>`
            var desc = games[req.params.game]['description']
        }
        res.render('game', {title: games[req.params.game]['title'], embed: games[req.params.game]['embedLink'], firebase: process.env.firebase, propsBool: propsBool, props: props, descBool: descBool, desc: desc})
    } else {
        res.render('404', {link: req.params.game, firebase: process.env.firebase})
    }
})

app.get('/search/:query', (req, res) => {
    var results = idx.search(req.params.query.split(' ').map(word => `*${word}*`).join(' '))
    var toReturn = {}
    for (const result of results) {
        const game = games[result.ref]
        toReturn[result.ref] = game
    }
    res.render('search', {query: req.params.query, games: JSON.stringify(toReturn)})
})

app.listen(port)
console.log("Server started at http://localhost:" + port)
