const express = require("express")
const path = require("path")
const mustache = require('mustache-express')
const app = express()
const port = 10000
const lunr = require("lunr")
const games = require("./games.json")
const updates = require("./updates.json")
const apps = require("./apps.json")
const res = require("express/lib/response");
const fs = require("fs")

var announcement = { // both support html, so if you want something like a link use <a> or if you want a newline use <br />
    title: "Announcements - APPS PAGE",
    description: `We always try to bring many new features to the Fire Game Site to improve our users' experience. In this update, we have decided to make our website have more than just games. We have added a brand new page that contains useful websites that don't classify as games. This page is located next to the games page button at the top, and it looks like 9 dots. At the moment, we only have a select few app, but we would be happy to hear your suggestions on which websites you want on that page. We hope that you enjoy the page! The page can be visited <a href="/apps">HERE</a>.<br /> <br />NOTE: IF YOU CLICK A BUTTON OR GAME AND NOTHING HAPPENS, GIVE THE SITE A BIT TO LOAD<br /> <br />NOTE: IF YOU WANT TO VISIT OUR CONTACT PAGE, APPS PAGE, MEET THE TEAM PAGE, OR OUR SPECIAL ANNOUNCEMENTS, CLICK THE ICONS ON THE TOP RIGHT CORNER<br /> <br />May 1, 2024: (It's the first of the month) We added the apps page (see above). We also removed Fortnite Geoguessr and Burrito Bison due to bugs.<br /> <br />April 25, 2024: Added Waffle Unlimited<br /> <br />April 22, 2024: Added Google Feud and Pokemon Showdown<br /> <br />April 21, 2024: Added a lot of brand new thumbnails (see above). We also changed the hosting of all of our site's thumbnails. They are now hosted on the Fire Game Site instead of a 3rd party service. If there are any bugs or issues with the new thumbnails, be sure to contact us so we can resolve the problem.`
}

var appPageAnn = { // both support html, so if you want something like a link use <a> or if you want a newline use <br />
    title: "Announcements - BEGINNING OF APPS PAGE",
    description: `Now, you can use more than just games on Fire Game Site. We added the apps page that already has a few apps ready for you to test, and many more planned for the future. To request something be added to the apps page, request it in the contact form.`
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

app.get('/apps', (req, res) => {
    res.render('apps', {apps: JSON.stringify(apps), firebase: process.env.firebase, title: appPageAnn.title, desc: appPageAnn.description})
})

app.get('/updates', (req, res) => {
    res.render('updates', {updates: JSON.stringify(updates), firebase: process.env.firebase})
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

app.get('/app/:game', (req, res) => {
    if (req.params.game in apps) {
        if (!!apps[req.params.game]['props']) {
            var propsBool = `<div style="width: 100%; height: 1px; border-radius: 1.5px; background: var(--md-sys-color-outline-variant);" ></div>`
            let propsList = ``
            for (const i in apps[req.params.game]['props']) {
                propsList += `<p style="padding: 10px; box-sizing: border-box; color: var(--md-sys-color-on-surface-variant); text-align: center; font-family: 'Roboto Flex', system-ui; font-size: 16px; font-weight: 400; letter-spacing: 0.5px;">${i}: ${apps[req.params.game]['props'][i]}</p>`
            }
            var props = `<div style="display: flex; padding: 10px; justify-content: center; align-items: center; align-content: center; gap: 15px; box-sizing: border-box; width: 100%; flex-wrap: wrap;">${propsList}</div>`
        }
        if (!!apps[req.params.game]['description']) {
            var descBool = `<div style="width: 100%; height: 1px; border-radius: 1.5px; background: var(--md-sys-color-outline-variant);" ></div>`
            var desc = apps[req.params.game]['description']
        }
        if (!apps[req.params.game]['fs']) {
            var fsBool = '<button id="fullscreen" style="position: absolute; background: var(--md-sys-color-primary); border-radius: 20px; border: none; font-family: \'Roboto Flex\', system-ui; color: var(--md-sys-color-on-primary); font-size: 14px; line-height: 20px; overflow: visible; box-sizing: border-box; height: 40px; font-weight: 500; letter-spacing: 0.1px; padding: 0 24px;">Fullscreen</button>'
        }
        res.render('game', {title: apps[req.params.game]['title'], embed: apps[req.params.game]['embedLink'], url: req.params.game, firebase: process.env.firebase, propsBool: propsBool, props: props, descBool: descBool, desc: desc, fs: fsBool})
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

app.listen(port)
console.log("Server started at http://localhost:" + port)
