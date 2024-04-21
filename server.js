const express = require("express")
const path = require("path")
const mustache = require('mustache-express')
const app = express()
const port = 10000
const lunr = require("lunr")
const games = require("./games.json")
const res = require("express/lib/response");
const fs = require("fs")

var announcement = { // both support html, so if you want something like a link use <a> or if you want a newline use <br />
    title: "Announcements - MEET THE TEM",
    description: `Our team works very hard to keep this website at it's best, and it's time you meet them. We have added a new page to the site that includes each member of the team as well as their role and a description of them. We are still waiting on a few employees to submit what they would like to be shown. Visit the page <a href="/team">HERE</a>.<br /><br />NOTE: IF YOU CLICK A BUTTON OR GAME AND NOTHING HAPPENS, GIVE THE SITE A BIT TO LOAD<br /> <br />NOTE: OUR TEAM IS CURRENTLY HARD AT WORK TO DESIGN BRAND MEW THUMBNAILS FOR NEW GAMES<br /> <br />NOTE: IF YOU WANT TO VISIT OUR CONTACT PAGE, MEET THE TEAM PAGE, OR OUR SPECIAL ANNOUNCEMENTS, CLICK THE ICONS ON THE TOP RIGHT CORNER<br /> <br />April 19, 2024: Added a bunch of games including Worldle, Statele, Connections Unlimited, Spelling Bee, and Sudoku. If you have any suggestions on what we should add, contact us by clicking the "question mark" button at the top right corner.`
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

app.get('/alternates', (req, res) => {
    res.render('alternates', {title: "Alternate Pages"})
})

app.get('/contact', (req, res) => {
    res.render('contact', {firebase: process.env.firebase})
})

app.get('/team', (req, res) => {
    res.render('team', {firebase: process.env.firebase})
})

app.get('/:game', (req, res) => {
    if (req.params.game in games) {
        if (!!games[req.params.game]['props']) {
            var propsBool = `<div style="width: 100%; height: 1px; border-radius: 1.5px; background: var(--md-sys-color-outline-variant);" ></div>`
            let propsList = ``
            for (const i in games[req.params.game]['props']) {
                propsList += `<p style="padding: 10px; box-sizing: border-box; color: var(--md-sys-color-on-surface-variant); text-align: center; font-family: 'Roboto Flex', system-ui; font-size: 16px; font-weight: 400; letter-spacing: 0.5px;">${i}: ${games[req.params.game]['props'][i]}</p>`
            }
            var props = `<div style="display: flex; padding: 10px; justify-content: center; align-items: center; align-content: center; gap: 15px; box-sizing: border-box; width: 100%; flex-wrap: wrap;">${propsList}</div>`
        }
        if (!!games[req.params.game]['description']) {
            var descBool = `<div style="width: 100%; height: 1px; border-radius: 1.5px; background: var(--md-sys-color-outline-variant);" ></div>`
            var desc = games[req.params.game]['description']
        }
        if (!games[req.params.game]['fs']) {
            var fsBool = '<button id="fullscreen" style="position: absolute; background: var(--md-sys-color-primary); border-radius: 20px; border: none; font-family: \'Roboto Flex\', system-ui; color: var(--md-sys-color-on-primary); font-size: 14px; line-height: 20px; overflow: visible; box-sizing: border-box; height: 40px; font-weight: 500; letter-spacing: 0.1px; padding: 0 24px;">Fullscreen</button>'
        }
        res.render('game', {title: games[req.params.game]['title'], embed: games[req.params.game]['embedLink'], url: req.params.game, firebase: process.env.firebase, propsBool: propsBool, props: props, descBool: descBool, desc: desc, fs: fsBool})
    } else {
        res.render('404', {link: req.params.game, firebase: process.env.firebase})
    }
})

app.get('/fs/:game', (req, res) => {
    if (req.params.game in games) {
        res.render('embed', {embed: games[req.params.game]['embedLink']})
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

app.get('/assets/:img', (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.sendFile(__dirname + `/assets/${req.params.img}`)
})

app.get('/thumbnails/:img', (req, res) => {
    res.setHeader('Content-Type', 'image/jpeg')
    res.sendFile(__dirname + `/thumbnails/${req.params.img}`)
})

app.get('/iframe pics/:img', (req, res) => {
    res.setHeader('Content-Type', 'embedLink/jpeg')
    res.sendFile(__dirname + `/iframe pics/${req.params.img}`)
})

app.listen(port)
console.log("Server started at http://localhost:" + port)
