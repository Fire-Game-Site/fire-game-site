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
        "hexanaut.io": {
        title: "Hexanaut.io",
        link: "hexanaut.io",
        image: "https://arsholde.sirv.com/Images/hexanaut.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://hexanaut.coolmathgames.com",
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
        image: "https://arsholde.sirv.com/Images/images.jpeg?w=209&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/r3tq6l1/to9d2if10dv@cf85de94e37e2fdb071b8ef5c4f09623682e9955/f12ds3/motox3m.xml"
    },
    "motox3m2": {
        title: "Moto X3M 2",
        link: "motox3m2",
        image: "https://arsholde.sirv.com/Images/download.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://840137492-163049537400263946.preview.editmysite.com/uploads/b/139890129-622598590552046666/files/mx3m2.xml"
    },
    "motox3m3": {
        title: "Moto X3M 3",
        link: "motox3m3",
        image: "https://arsholde.sirv.com/Images/mx3m3.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://486017395-735910036185936427.preview.editmysite.com/uploads/b/139890129-378637188943279878/files/mx3m3.xml"
    },
    "motox3m-spookyland": {
        title: "Moto X3M Spooky Land",
        link: "motox3m-spookyland",
        image: "https://arsholde.sirv.com/Images/mx3msl.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://318573026-162284027483016384.preview.editmysite.com/uploads/b/139890129-642750312748978757/files/mx3msl.xml"
    },
    "motox3m-winter": {
        title: "Moto X3M Winter",
        link: "motox3m-winter",
        image: "https://arsholde.sirv.com/Images/mx3mw.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/r3tq6l1/to9d2if10dv@30dcfcb302cb76dee9d919a6ff87ee97b63efe7b/ue4d1w/moto-x3m-winter.xml"
    },
    "motox3m-poolparty": {
        title: "Moto X3M Pool Party",
        link: "motox3m-poolparty",
        image: "https://arsholde.sirv.com/Images/mx3mpp.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://649025137-174029463385024710.preview.editmysite.com/uploads/b/139890129-767696982876512205/files/mx3mpp.xml"
    },"run1": {
        title: "Run 1",
        link: "run1",
        image: "https://arsholde.sirv.com/Images/run1.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Frun1.xml"
    },
    "run2": {
        title: "Run 2",
        link: "run2",
        image: "https://arsholde.sirv.com/Images/run2.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Frun2.xml"
    },
    "run3": {
        title: "Run 3",
        link: "run3",
        image: "https://arsholde.sirv.com/Images/run3.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://lekug.github.io/tn6pS9dCf37xAhkJv/"
    },
    "idlebreakout": {
        title: "Idle Breakout",
        link: "idlebreakout",
        image: "https://arsholde.sirv.com/Images/idlebreakout.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://v6p9d9t4.ssl.hwcdn.net/html/1317921/index.html"
    },
     "spacebarclicker": {
        title: "Spacebar Clicker",
        link: "spacebarclicker",
        image: "https://arsholde.sirv.com/Images/spacebar-clicker.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://js13kgames.com/games/spacebar-clicker/index.html"
    },
     "polyblicy": {
        title: "Polyblicy",
        link: "polyblicy",
        image: "https://arsholde.sirv.com/Images/polyblicy.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://www.gaming-style.com/POLYBLICY/Game/index.php"
    },
     "chess": {
        title: "Chess",
        link: "chess",
        image: "https://arsholde.sirv.com/Images/chess.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://games.s3.yandex.net/98056/97gqo1d58zqyyat5ser6l0pnqqxp3f13/index.html"
    },
     "eggycar": {
        title: "Eggy Car",
        link: "eggycar",
        image: "https://arsholde.sirv.com/Images/eggycar.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://493104753-963057148227461038.preview.editmysite.com/uploads/b/139890129-825858355833705451/files/ecf.xml"
    },
     "retrobowl": {
        title: "Retro Bowl",
        link: "retrobowl",
        image: "https://arsholde.sirv.com/Images/retrobowl.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://game316009.konggames.com/gamez/0031/6009/live/index.html"
    },
     "flap": {
        title: "Flap",
        link: "flap",
        image: "https://arsholde.sirv.com/Images/flap.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://www.newgrounds.com/portal/view/749633"
     "8ballpool": {
        title: "8 Ball Pool",
        link: "8ballpool",
        image: "https://arsholde.sirv.com/Images/8ballpool.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "//ams.cdn.arkadiumhosted.com/assets/global/game/pool-default/?show_game_end=false&locale=en-us&device_type=pc&arena_name=gamedistribution.arkadiumarena.com&game_name=8%20Ball%20Pool&events=game_start,game_end,pause_ready,event_change,abtest_init,reward_start&play_id=LTUyNzg=?show_game_end=false&locale=en-us&device_type=pc&arena_name=gamedistribution.arkadiumarena.com&game_name=8%20Ball%20Pool&events=game_start,game_end,pause_ready,event_change,abtest_init,reward_start&play_id=LTUyNzg="
    },
     "googlebaseball": {
        title: "Google Doodle Baseball",
        link: "googlebaseball",
        image: "https://arsholde.sirv.com/Images/googlebaseball.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://www.google.com/logos/2019/july4th19/r3/july4th19.html"
    },
     "googlecricket": {
        title: "Google Doodle Cricket",
        link: "googlecricket",
        image: "https://arsholde.sirv.com/Images/googlecricket.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://www.google.com/logos/2017/cricket17/cricket17.html"
    },
     "googlesnake": {
        title: "Google Snake",
        link: "googlesnake",
        image: "https://arsholde.sirv.com/Images/googlesnake.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://snak.ee/google-snake-new/index.html"
    },
        "awesomeplanes": {
        title: "Awesome Planes",
        link: "awesomeplanes",
        image: "https://arsholde.sirv.com/Images/awesomeplanes.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://games.kidzsearch.com/computer/flashgame_data/ruffleplayer.html?game=awesome-planes-43646"
    },
        "awesometanks": {
        title: "Awesome Tanks",
        link: "awesometanks",
        image: "https://arsholde.sirv.com/Images/awesometanks.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://638508418-274639104736829364.preview.editmysite.com/uploads/b/139890129-212982790859809719/files/at1.xml"
    },
        "awesometanks2": {
        title: "Awesome Tanks 2",
        link: "awesometanks2",
        image: "https://arsholde.sirv.com/Images/awesometanks2.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://37406915-471836402253847146.preview.editmysite.com/uploads/b/139890129-165727670653336700/files/at2.xml"
    },
        "basketballstars": {
        title: "Basketball Stars",
        link: "basketballstars",
        image: "https://arsholde.sirv.com/Images/basketballstars.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/r3tq6l1/to9d2if3dv@66c73577d404dbf17a688cd4ae3198db4ba840d4/zm48hw/bs.xml"
    },
        "candycrush": {
        title: "Candy Crush",
        link: "candycrush",
        image: "https://arsholde.sirv.com/Images/candycrush.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://830581635-628405001538672842.preview.editmysite.com/uploads/b/139890129-709153476852373754/files/cc.xml"
    },
        "wrestlebros": {
        title: "Wrestle Bros",
        link: "wrestlebros",
        image: "https://arsholde.sirv.com/Images/wrestlebros.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://wrestlebros.io/"
    },
        "getawayshootout": {
        title: "Getaway Shootout",
        link: "getawayshootout",
        image: "https://arsholde.sirv.com/Images/getawayshootout.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/fr6ks8ab/vi9syd1rm@d2542b2b948a265eddaa25f984368f25fafc1447/g64dh6j/Getaway-Shootout.xml"
    },
        "1v1.lol": {
        title: "1v1.lol",
        link: "1v1.lol",
        image: "https://arsholde.sirv.com/Images/1v1lol.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/ko1ov/to@1e8a949f89fcf2b110640c41a0705db01405d161/d7uf4.xml"
    },
        "driftboss": {
        title: "Drift Boss",
        link: "driftboss",
        image: "https://arsholde.sirv.com/Images/driftboss.jpeg?w=209&scale.option=ignore",
        embedLink: "https://www.mathplayground.com/drift-boss-v3/index.html"
    },
       "worldshardestgame": {
        title: "World's Hardest Game",
        link: "worldshardestgame",
        image: "https://arsholde.sirv.com/Images/worldshardestgame.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fthe-world-s-hardest-game.xml"
    },
       "Minecraft1.5.2": {
        title: "Minecraft 1.5.2",
        link: "Minecraft1.5.2",
        image: "https://arsholde.sirv.com/Images/minecraft1.5.2.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://sd592g.github.io/zj684od4lfg/"
    },
       "Minecraft1.8.8": {
        title: "Minecraft 1.8.8",
        link: "Minecraft1.8.8",
        image: "https://arsholde.sirv.com/Images/minecraft1.8.8.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://eaglercraft.q13x.com"
    },
       "flappybird": {
        title: "Flappy Bird",
        link: "flappybird",
        image: "https://arsholde.sirv.com/Images/flappybird.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://gameshost.io/HTML5GAMES/flappybird/"
    },
       "mrbullet": {
        title: "Mr.Bullet",
        link: "mrbullet",
        image: "https://arsholde.sirv.com/Images/mrbullet.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "//gameshost.io/HTML5GAMES/mr_bullet/"
    },
       "rocketleague": {
        title: "Rocket League",
        link: "rocketleague",
        image: "https://arsholde.sirv.com/Images/rocketleague.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://g.vseigru.net/10/igra-raketnyj-futbol-derbi/"
    },
       "jellytruck": {
        title: "Jelly Truck",
        link: "jellytruck",
        image: "https://arsholde.sirv.com/Images/jellytruck.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://webglmath.github.io/jelly-truck/"
    },
       "penaltykickonline": {
        title: "Penalty Kick Online",
        link: "penaltykickonline",
        image: "https://arsholde.sirv.com/Images/penaltykickonline.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://rawcdn.githack.com/PenaltyKickOnline/PenaltyKickOnline.github.io/f432955990ac6493d47a17a9e56fbc3e7483713a/index.html"
    },
        "bigtowertinysquare": {
        title: "Big Tower Tiny Square",
        link: "bigtowertinysquare",
        image: "https://arsholde.sirv.com/Images/bigtowertinysquare.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/r3tq6l1/to9d2if3dv@52c352908edb192e5f9da18780ba2cd535af5c1b/ge4q26/btts.xml"
    },
          "bigtowertinysquare2": {
        title: "Big Tower Tiny Square 2",
        link: "bigtowertinysquare2",
        image: "https://arsholde.sirv.com/Images/bigtowertinysquare2.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://183662057-183305820582754925.preview.editmysite.com/uploads/b/139890129-258428596653956378/files/btts2.xml"
    },
          "bigicetowertinysquare": {
        title: "Big Ice Tower Tiny Square",
        link: "bigicetowertinysquare",
        image: "https://arsholde.sirv.com/Images/bigicetowertinysquare.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://v6p9d9t4.ssl.hwcdn.net/html/673441/index.html?v=1542782130"
    },
         "bigneontowertinysquare": {
        title: "Big Neon Tower Tiny Square",
        link: "bigneontowertinysquare",
        image: "https://arsholde.sirv.com/Images/bigneontowertinysquare.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://v6p9d9t4.ssl.hwcdn.net/html/3818171/Big NEON Tower Itch 1.0/index.html"
    },
      "bigflappytowertinysquare": {
        title: "Big Flappy Tower Tiny Square",
        link: "bigflappytowertinysquare",
        image: "https://arsholde.sirv.com/Images/bigflappytowertinysquare.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://game.enjoy4fun.com/bigflappytowertinysquare/v1/index.html?uid=ci4i7dcdj1kthv0nc7b0&sid=1686709173182-e110afb7-78fe-4fun-08c9-f4efe9d173a0&channel-id=3487216655&site-id=site_4&zone-id=44233"
    },
     "supermario": {
        title: "Super Mario",
        link: "supermario",
        image: "https://arsholde.sirv.com/Images/supermario.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://395713058-173957204856294731.preview.editmysite.com/uploads/b/139890129-314264279627264120/files/smb.xml"
    },
        "stumbleguys": {
        title: "Stumble Guys",
        link: "stumbleguys",
        image: "https://arsholde.sirv.com/Images/stumbleguys.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://www.stumbleguys.com/play"
    },    
        "connect4": {
        title: "Connect 4",
        link: "connect4",
        image: "https://arsholde.sirv.com/Images/connect4.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://bloobio-fourinarow.coolmathgames.com/fourinarow"
    },    
        "cookieclicker": {
        title: "Cookie Clicker",
        link: "cookieclicker",
        image: "https://arsholde.sirv.com/Images/cookieclicker.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/sk1bx/Cookie@9e0084916e9f198ed201bf47e93e6b0f2bdca5fe/cc.xml"
    },    
        "basketbros": {
        title: "Basket Bros",
        link: "basketbros",
        image: "https://arsholde.sirv.com/Images/basketbros.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://basketbros.io/cg/"
    },     
        "subwaysurfers": {
        title: "Subway Surfers",
        link: "subwaysurfers",
        image: "https://arsholde.sirv.com/Images/subwaysurfers.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://zayaruzostreetorgan.com/uploads/5/5/6/7/5567194/custom_themes/694498548762407962/surfers.html"
    },    
        "stickmanhook": {
        title: "Stickman Hook",
        link: "stickmanhook",
        image: "https://arsholde.sirv.com/Images/stickmanhook.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://webglmath.github.io/stickmanhook/"
    },   
        "ovo": {
        title: "OvO",
        link: "ovo",
        image: "https://arsholde.sirv.com/Images/ovo.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://dedragames.com/games/ovo/1.4/"
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
