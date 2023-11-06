const express = require("express")
const path = require("path")
const mustache = require('mustache-express')
const app = express()
const port = 10000

var announcement = { // both support html, so if you want something like a link use <a> or if you want a newline use <br />
    title: "Annnouncements",
    description: "Make sure to SUBSCRIBE to our <a href='https://youtube.com/@firegames52123?si=tdwqa6Hx4Emqtfbb'>YouTube Channel!</a> <br />  <br />November 5, 2023: Unfortunately, the game, Death Run 3D, has been removed from the Fire Game Site. This is due to numerous user complains as well as technical difficulties. We hope that we can bring this game back in the future! <br />  <br />In our most recent update, we have added games including:<br /><ul><li><a href='/runbunbunrun'>Run Bun Bun Run</a></li><li><a href='/chess'>Chess</a></li><li><a href='/wordle'>Wordle</a></li><li><a href='/snowrider'>Snow Rider 3D</a></li><li><a href='/impossiblegame'>The Impossible Game</a></li><li><a href='/geometrydash'>Geometry Dash</a></li></ul>"
}

var games = {
    "ytchannel": {  // type the link, same as below, of the game here
        title: "The Fire Games Official Youtube Channel", // type the title of the game here
        link: "ytchannel", // the title but with link friendly, so no spaces or symbols
        image: "https://arsholde.sirv.com/logo.jpg?w=209&h=155&scale.option=ignore", // type the link to the cover image here
        embedLink: "https://arsholde.sirv.com/Screenshot%202023-11-05%2011.07.57%20PM.png?w=1300&h=650", // type the iframe embed link here
        props: { // list out properties here (developer, release date, etc.). it will dynamically change so add whatever properties you want
            Subscribe: "For gameplay videos and promotional content!",
            Link: "<a href='https://youtube.com/@firegames52123?si=tdwqa6Hx4Emqtfbb'>Subscribe to our Youtube Channel HERE</a>"
        },
    },
    "defly.io": {  // type the link, same as below, of the game here
        title: "Defly.io (All Games)", // type the title of the game here
        link: "defly.io", // the title but with link friendly, so no spaces or symbols
        image: "https://arsholde.sirv.com/Images/Untitled.jpg?w=209&h=177&scale.option=ignore", // type the link to the cover image here
        embedLink: "https://defly.io/", // type the iframe embed link here
        props: { // list out properties here (developer, release date, etc.). it will dynamically change so add whatever properties you want
            Developer: "Exodragon Games",
            Controls: "Arrow keys-move, Spacebar-place tower, Left click-shoot, E-Superpower",
            Objective: "Capture the map and eliminate all opponents"
        },
        description: "Defly is an exhilarating, fast-paced battle game where you pilot a helicopter in an active warzone. The goal is to fire your projectiles at the enemy hostiles, popping them on a single successful hit. However, to keep the game from lasting more than five seconds, you can build using the spacebar to place down a tower. Make a connected shape with the towers to gain points. You can also gain points by eliminating hostile players. Use points to level up. Level up to gain +’s. Use +’s to give yourself upgraded attributes, including tower health, firing speed, firing range, and player speed. At level twenty you unlock a superpower, which grants you a special perk which is extremely useful in combat situations!" // type description here
    },
    "paper.io-2": {
        title: "Paper.io 2",
        link: "paper.io-2",
        image: "https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/d2708e8aa31df3fe7b211bca36405d6d.png",
        embedLink: "https://paper-io.com/",
        props: {
            Developer: "Voodoo",
            Controls: "Arrow Keys, WASD, or mouse-move",
            Objective: "Capture the map"
        },
        description: "A game all about claiming territory and staying alive, Paper.io 2 has the perfect combination of strategy and skill. With plenty of game modes and customization options, this game can cater to all your gaming needs."
    },
    "hexanaut.io": {
        title: "Hexanaut.io",
        link: "hexanaut.io",
        image: "https://arsholde.sirv.com/Images/hexanaut.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://hexanaut.coolmathgames.com",
        props: {
            Developer: "Voodoo",
            Controls: "WASD/mouse-move",
            Objective: "Capture the map"
        },
        description: "HEXANAUT.IO is a territory-claiming skill based game. With strategic capture points to give you a game-winning advantage, there are endless playstyles to be the best. Additionally, the game offers a multitude of customization options, with characters for everyone."
    },
    "slope": {
        title: "Slope",
        link: "slope",
        image: "https://arsholde.sirv.com/Images/images.jpg",
        embedLink: "https://kdata1.com/2020/05/slope/",
        props: {
            Developer: "Y8",
            Controls: "Arrows/WASD-move",
            Objective: "Get as far as possible"
        },
        description: "This simple, physics based game has you rolling a ball down a slope. As you get farther, your speed increases. There is only one rule: DON'T HIT THE RED BLOCKS! This game will keep you entertained for hours!"
    },
    "motox3m1": {
        title: "Moto X3M 1",
        link: "motox3m1",
        image: "https://arsholde.sirv.com/Images/images.jpeg?w=209&scale.option=ignore",
        embedLink: "https://google-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/bobydob/JSEngine@99563e3bf6eb25323e3bd5af20dcd9a261b97991/build/m3m/m3m.xml",
        props: {
            Developer: "Madpuffers",
            Controls: "Up-forward, Down-Backwards, Right-front wheel, Left-back wheel",
            Objective: "Get done as fast as possible"
        },
        description: "Fast paced and dependent on skill, this motorcycle game offers plenty of obstacles and courses for you to complete, each level with its different challenges. The objective is to make it to the finish line in the least amount of time, deaths costing you."
    },
    "motox3m2": {
        title: "Moto X3M 2",
        link: "motox3m2",
        image: "https://arsholde.sirv.com/Images/download.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://840137492-163049537400263946.preview.editmysite.com/uploads/b/139890129-622598590552046666/files/mx3m2.xml",
        props: {
            Developer: "Madpuffers",
            Controls: "Up-forward, Down-Backwards, Right-front wheel, Left-back wheel",
            Objective: "Get done as fast as possible"
        },
        description: "The sequel to the original, filled with all new obstacles for you to complete. Race your motorcycle to the finish line in the fastest time possible for the best score!"
    },
    "motox3m3": {
        title: "Moto X3M 3",
        link: "motox3m3",
        image: "https://arsholde.sirv.com/Images/mx3m3.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://486017395-735910036185936427.preview.editmysite.com/uploads/b/139890129-378637188943279878/files/mx3m3.xml",
        props: {
            Developer: "Madpuffers",
            Controls: "Up-forward, Down-Backwards, Right-front wheel, Left-back wheel",
            Objective: "Get done as fast as possible"
        },
        description: "The third installment in the MOTO X3M series, offering even more challenging courses to play through and beat. Remember, faster the better!"
    },
    "motox3m-spookyland": {
        title: "Moto X3M Spooky Land",
        link: "motox3m-spookyland",
        image: "https://arsholde.sirv.com/Images/mx3msl.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://318573026-162284027483016384.preview.editmysite.com/uploads/b/139890129-642750312748978757/files/mx3msl.xml",
        props: {
            Developer: "Madpuffers",
            Controls: "Up-forward, Down-Backwards, Right-front wheel, Left-back wheel",
            Objective: "Get done as fast as possible"
        },
        description: "With creepy obstacles and scary challenges, this version of MOTO X3M will keep you on the edge of your seat! Race to the end of the creepy course in the fastest time possible!"
    },
    "motox3m-winter": {
        title: "Moto X3M Winter",
        link: "motox3m-winter",
        image: "https://arsholde.sirv.com/Images/mx3mw.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/r3tq6l1/to9d2if10dv@30dcfcb302cb76dee9d919a6ff87ee97b63efe7b/ue4d1w/moto-x3m-winter.xml",
        props: {
            Developer: "Madpuffers",
            Controls: "Up-forward, Down-Backwards, Right-front wheel, Left-back wheel",
            Objective: "Get done as fast as possible"
        },
        description: "Feeling festive? Race through this Christmas themed land in as little time as possible!"
    },
    "motox3m-poolparty": {
        title: "Moto X3M Pool Party",
        link: "motox3m-poolparty",
        image: "https://arsholde.sirv.com/Images/mx3mpp.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://649025137-174029463385024710.preview.editmysite.com/uploads/b/139890129-767696982876512205/files/mx3mpp.xml",
        props: {
            Developer: "Madpuffers",
            Controls: "Up-forward, Down-Backwards, Right-front wheel, Left-back wheel",
            Objective: "Get done as fast as possible"
        },
        description: "Cool off and enjoy summer with MOTO X3M Pool Party! With a chill summer vibe and plenty of new obstacles, this is the perfect way to beat the heat!"
    },
    "run1": {
        title: "Run 1",
        link: "run1",
        image: "https://arsholde.sirv.com/Images/run1.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Frun1.xml",
        props: {
            Developer: "Joseph Cloutier",
            Controls: "Up arrow/W-jump, Left and right arrow/A and D-left and right",
            Objective: "Don’t die!"
        },
        description: "A new take on platformer games that really tests your reaction time and skill, make it through the end of the tunnel without taking a trip into space! Remember, with no gravity, you can run on all sides of the tunnel!"
    },
    "run2": {
        title: "Run 2",
        link: "run2",
        image: "https://arsholde.sirv.com/Images/run2.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Frun2.xml",
        props: {
            Developer: "Joseph Cloutier",
            Controls: "Up arrow/W-jump, Left and right arrow/A and D-left and right",
            Objective: "Don’t die!"
        },
        description: "The sequel to Run 1, with plenty of new levels and challenges for you to complete. Not challenging enough? Use the all new level creator and make your own for you and your friends to beat! Make it through the end of the tunnel without falling into the void of space! Remember, with no gravity, you can run on all sides of the tunnel!"
    },
    "run3": {
        title: "Run 3",
        link: "run3",
        image: "https://arsholde.sirv.com/Images/run3.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://lekug.github.io/tn6pS9dCf37xAhkJv/",
        props: {
            Developer: "Joseph Cloutier",
            Controls: "Up arrow/W-jump, Left and right arrow/A and D-left and right",
            Objective: "Don’t die!"
        },
        description: "The third and newest installment to the Run game series, with tons of new levels and hidden tunnels to complete. With a multitude of characters to unlock and play as with different abilities, any playstyle is supported! Run and jump to the end of the tunnel without falling into the abyss of space! Remember, with no gravity, you can run on all sides of the tunnel!"
    },
    "idlebreakout": {
        title: "Idle Breakout",
        link: "idlebreakout",
        image: "https://arsholde.sirv.com/Images/idlebreakout.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://v6p9d9t4.ssl.hwcdn.net/html/1317921/index.html",
        props: {
            Developer: "Kodiqi",
            Controls: "Left click-EVERYTHING",
            Objective: "Break all the blocks"
        },
        description: "A classic twist on the original game, where in order to complete the level, you have to destroy all the bricks that get increasingly stronger. Buy balls that bounce around and help you destroy those breaks, each with special attributes and abilities."
    },
    "eggycar": {
        title: "Eggy Car",
        link: "eggycar",
        image: "https://arsholde.sirv.com/Images/eggycar.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://493104753-963057148227461038.preview.editmysite.com/uploads/b/139890129-825858355833705451/files/ecf.xml",
        props: {
            Developer: "Beedo Games",
            Controls: "Right arrow/D-forward, Left arrow/A-backwards",
            Objective: "Survive as long as possible without dying"
        },
        description: "Drive as far as you can without crashing your egg! Collect coins along the way to unlock other vehicles and challenge your friends to beat your score!"
    },
    "retrobowl": {
        title: "Retro Bowl",
        link: "retrobowl",
        image: "https://arsholde.sirv.com/Images/retrobowl.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://game316009.konggames.com/gamez/0031/6009/live/index.html",
        props: {
            Developer: "New Star Games",
            Controls: "Left-right arrows- dive, =Mouse- throw, click running back, Up-down-move character up & down",
            Objective: "Win the Retro Bowl!"
        },
        description: "Retro Bowl is an American football game in retro style where your purpose is to coach your team to victory each season. What will you do as the ultimate coach? Spend coaching credits to upgrade your stadium, and other things!"
    },
    "awesomeplanes": {
        title: "Awesome Planes",
        link: "awesomeplanes",
        image: "https://arsholde.sirv.com/Images/awesomeplanes.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://games.kidzsearch.com/computer/flashgame_data/ruffleplayer.html?game=awesome-planes-43646",
        props: {
            Developer: "Big Dino Games",
            Controls: "Arrow keys-move, Click-fire missles",
            Objective: "Coming Soon!"
        },
        description: "A high speed plane battle game where the objective is to clear the level of all enemy planes! Spend earned cash to buy new weapons and upgrades to help you progress through the increasingly difficult levels!"
    },
    "awesometanks": {
        title: "Awesome Tanks",
        link: "awesometanks",
        image: "https://arsholde.sirv.com/Images/awesometanks.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://638508418-274639104736829364.preview.editmysite.com/uploads/b/139890129-212982790859809719/files/at1.xml",
        props: {
            Developer: "Big Dino Games",
            Controls: "Arrow keys/WASD-move, Click-fire, Mouse-Aim",
            Objective: "Coming Soon!"
        },
        description: "Fight in battles against enemy tanks and destroy all enemies to beat the increasingly difficult levels! Spend earned cash on new weapons and upgrades to help you beat the game!"
    },
    "awesometanks2": {
        title: "Awesome Tanks 2",
        link: "awesometanks2",
        image: "https://arsholde.sirv.com/Images/awesometanks2.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://37406915-471836402253847146.preview.editmysite.com/uploads/b/139890129-165727670653336700/files/at2.xml",
        props: {
            Developer: "Big Dino Games",
            Controls: "Arrow keys/WASD-move, Click-fire, Mouse-Aim",
            Objective: "Coming Soon!"
        },
        description: "The second game in the Awesome Tanks series, with all new levels and weapons for you to try out! Clear each level of all enemies and spend the cash you earn to upgrade your tank into the ultimate destruction machine!"
    },
    "basketballstars": {
        title: "Basketball Stars",
        link: "basketballstars",
        image: "https://arsholde.sirv.com/Images/basketballstars.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://webglmath.github.io/basketball-stars/",
        props: {
            Developer: "Madpuffers",
            Controls: "Coming Soon!",
            Objective: "Coming Soon!"
        },
        description: "A 2d 1v1 or 2v2 basketball game, where your goal is to win the championship game! Pick a team and shoot your way to victory!"
    },
    "wrestlebros": {
        title: "Wrestle Bros",
        link: "wrestlebros",
        image: "https://arsholde.sirv.com/Images/wrestlebros.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://wrestlebros.io/",
        props: {
            Developer: "Blue Wizard Digital",
            Controls: "W-Jump, A & S-move, Space-attack",
            Objective: "Win the Match"
        },
        description: "Fight your way to victory in this fast paced, 2d wrestling game! Choose from a wide range of characters and unleash all shorts of crazy moves to demolish your opponent."
    },
    "1v1.lol": {
        title: "1v1.lol",
        link: "1v1.lol",
        image: "https://arsholde.sirv.com/Images/1v1lol.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://1v1.lol/",
        props: {
            Developer: "JustPlay.lol",
            Controls: "Adjustable in settings",
            Objective: "Win!"
        },
        description: "Shoot and build your way to victory! Requires a lot of skill and aim and has many different game modes to keep you entertained! Play with strangers or up to 8 friends online!"
    },
    "driftboss": {
        title: "Drift Boss",
        link: "driftboss",
        image: "https://arsholde.sirv.com/Images/driftboss.jpeg?w=209&scale.option=ignore",
        embedLink: "https://www.mathplayground.com/drift-boss-v3/index.html",
        props: {
            Developer: "Math Playground",
            Controls: "Spacebar-turn",
            Objective: "Get as far as possible."
        },
        description: "Drift Boss is an incredibly fun game where you have to drift your way through the path and not fall off! The longer you stay on, the more points you earn!. Use coins you collect to activate power ups to increase your score!"
    },
    "worldshardestgame": {
        title: "World's Hardest Game",
        link: "worldshardestgame",
        image: "https://arsholde.sirv.com/Images/worldshardestgame.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://google-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fthe-world-s-hardest-game.xml",
        props: {
            Developer: "Armor Games",
            Controls: "WASD-move",
            Objective: "Get to the end without dying."
        },
        description: "A simple yet infuriating game where the goal is to get to the end of the level after collecting all the coins. Watch out for the blue squares and circles that will make you start the level over and lose your coins!"
    },
    "worldshardestgame2": {
        title: "Worlds Hardest Game 2 (Image Pending)",
        link: "worldshardestgame2",
        image: "",
        embedLink: "https://webglmath.github.io/worlds-hardest-game-2/",
        props: {
            Developer: "",
            Controls: "",
            Objective: ""
        },
        description: ""
    },
    "jellytruck": {
        title: "Jelly Truck",
        link: "jellytruck",
        image: "https://arsholde.sirv.com/Images/jellytruck.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://webglmath.github.io/jelly-truck/",
        props: {
            Developer: "CoolMathGames",
            Controls: "Up arrow-move right, Down arrow-move left, Right arrow-lean right, Left arrow-lean left",
            Objective: "Reach the end"
        },
        description: "Drive a truck made of jelly to the finish line! With wonky graphics and kooky physics, you’ll have a blast playing Jelly Truck!"
    },
    "bigtowertinysquare": {
        title: "Big Tower Tiny Square",
        link: "bigtowertinysquare",
        image: "https://arsholde.sirv.com/Images/bigtowertinysquare.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/r3tq6l1/to9d2if3dv@52c352908edb192e5f9da18780ba2cd535af5c1b/ge4q26/btts.xml",
        props: {
            Developer: "Evil Objective",
            Controls: "WASD-Move, Spacebar-jump",
            Objective: "Save the pineapple"
        },
        description: "Jump and climb your way up the tower to rescue your friend Pineapple! Each game in this saga gives your square special abilities that will aid you in your journey!"
    },
    "bigicetowertinysquare": {
        title: "Big Ice Tower Tiny Square",
        link: "bigicetowertinysquare",
        image: "https://arsholde.sirv.com/Images/bigicetowertinysquare.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://v6p9d9t4.ssl.hwcdn.net/html/673441/index.html?v=1542782130",
        props: {
            Developer: "Evil Objective",
            Controls: "WASD-Move, Spacebar-jump",
            Objective: "Save the pineapple"
        },
        description: "Jump and climb your way up the tower to rescue your friend Pineapple! Each game in this saga gives your square special abilities that will aid you in your journey!"
    },
    "bigneontowertinysquare": {
        title: "Big Neon Tower Tiny Square",
        link: "bigneontowertinysquare",
        image: "https://arsholde.sirv.com/Images/bigneontowertinysquare.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://v6p9d9t4.ssl.hwcdn.net/html/3818171/Big NEON Tower Itch 1.0/index.html",
        props: {
            Developer: "Evil Objective",
            Controls: "WASD-Move, Spacebar-jump",
            Objective: "Save the pineapple"
        },
        description: "Jump and climb your way up the tower to rescue your friend Pineapple! Each game in this saga gives your square special abilities that will aid you in your journey!"
    },
    "bigflappytowertinysquare": {
        title: "Big Flappy Tower Tiny Square",
        link: "bigflappytowertinysquare",
        image: "https://arsholde.sirv.com/Images/bigflappytowertinysquare.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://game.enjoy4fun.com/bigflappytowertinysquare/v1/index.html?uid=ci4i7dcdj1kthv0nc7b0&sid=1686709173182-e110afb7-78fe-4fun-08c9-f4efe9d173a0&channel-id=3487216655&site-id=site_4&zone-id=44233",
        props: {
            Developer: "Evil Objective",
            Controls: "WASD-Move, Spacebar-jump",
            Objective: "Save the pineapple"
        },
        description: "Jump and climb your way up the tower to rescue your friend Pineapple! Each game in this saga gives your square special abilities that will aid you in your journey!"
    },
    "bigtowertinysquare2": {
        title: "Big Tower Tiny Square 2",
        link: "bigtowertinysquare2",
        image: "https://arsholde.sirv.com/Images/bigtowertinysquare2.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://183662057-183305820582754925.preview.editmysite.com/uploads/b/139890129-258428596653956378/files/btts2.xml",
        props: {
            Developer: "Evil Objective",
            Controls: "WASD-Move, Spacebar-jump",
            Objective: "Save the pineapple"
        },
        description: "Jump and climb your way up the tower to rescue your friend Pineapple! Each game in this saga gives your square special abilities that will aid you in your journey!"
    },
    "connect4": {
        title: "Connect 4",
        link: "connect4",
        image: "https://arsholde.sirv.com/Images/connect4.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://bloobio-fourinarow.coolmathgames.com/fourinarow",
        props: {
            Controls: "Left click-everything",
            Objective: "Get 4 pieces in a row!"
        },
        description: "A classic connect 4 game digitized! Get 4 of your colored pieces in a row in any direction to win!"
    },
    "basketbros": {
        title: "Basket Bros",
        link: "basketbros",
        image: "https://arsholde.sirv.com/Images/basketbros.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://basketbros.io/cg/",
        props: {
            Developer: "Blue Wizard Digital",
            Controls: "WASD (+G)-Move (and shoot), Arrow keys (+L)- Move (and shoot)",
            Objective: "Win!"
        },
        description: "BasketBros is a fast-paced basketball game with online and offline gameplay. Choose a basketballer, customize your style, and compete in singleplayer and multiplayer games. Throw down some sick dunks and win the game to earn upgrades and unlockables."
    },
    "stickmanhook": {
        title: "Stickman Hook",
        link: "stickmanhook",
        image: "https://arsholde.sirv.com/Images/stickmanhook.jpeg?w=209&h=177&scale.option=ignore",
        embedLink: "https://webglmath.github.io/stickmanhook/",
        props: {
            Developer: "Madbox",
            Controls: "Spacebar/click-grab nearest grapple point",
            Objective: "Coming Soon!"
        },
        description: "Grapple on to grapple points and swing your way through the level to reach the finish line without falling!"
    },
    "ovo": {
        title: "OvO",
        link: "ovo",
        image: "https://arsholde.sirv.com/Images/ovo.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://dedragames.com/games/ovo/1.4/",
        props: {
            Developer: "Dedra Games",
            Controls: "Arrow keys/WASD-Move",
            Objective: "Finish the course fast"
        },
        description: "Run, jump and dive your way through the course in the least amount of time possible."
    },
    "runbunbunrun": {
        title: "Run Bun Bun Run (ImagePending)",
        link: "runbunbunrun",
        image: "blob:chrome-untrusted://media-app/73bb3f2e-131a-4552-9dfb-932da76dfd8e",
        embedLink: "https://play.gx.games/game-wrapper/83cab7c7-98ab-48aa-b032-14c88d60fc46/index.html?game=bdb67378-d6b5-4ee2-8c1c-77b8cd615b8d&track=2290e893-9b87-4c2b-8a92-7f66c5ed64eb&release=ec8eb2aa-f925-4776-98af-47b25c2bb6b6&gamePlayId=6dd54512-f257-4e69-b253-5ccb319d3b9f&coverImage=https://play.gxc.gg/game/bdb67378-d6b5-4ee2-8c1c-77b8cd615b8d/cover/c36c52ba-95c3-4518-a9ba-f58d6c02c737?cfe6f815c7a9257b4ea7f6afd906db7f&source=https://gx.games",
        props: {
            Developer: "GX Games",
            Controls: "A/Left Arrow- Jump left, D/Right Arrow-Jump Right",
            Objective: "Coming Soon!"
        },
        description: "A game all about reaction time and hand-eye coordination, get your bunny up as high as you can without falling down into the lava!"
    },
    "studentmetasite": {
        title: "Student Meta Site",
        link: "studentmetasite",
        image: "",
        embedLink: "https://sites.google.com/view/finalnews/home?authuser=0",
        props: {
            Developer: "Shane S.",
            Link: "<a href='https://sites.google.com/view/finalnews/news/the-school-times-is-back?authuser=0'>View the Student Meta Site HERE</a>"
        },
        description: "Check out this really fun site!"
    },
    "chess": {
        title: "Chess(Image Pending)",
        link: "chess",
        image: "",
        embedLink: "https://share.chessbase.com/SharedGames/game/?p=2pM/jkZ9f9jCDyowOHQtgD1ZPXJmtMiFTgwzHQ/oASXgXVQkYMybQVeIc0vjKb0z",
        props: {
            Developer: "Math Playground",
            Controls: "",
            Objective: ""
        },
        description: ""
    },
    "bigsites": {
        title: "Big Sites",
        link: "bigsites",
        image: "https://arsholde.sirv.com/Big%20news.png?w=209&h=177&scale.option=ignore",
        embedLink: "https://arsholde.sirv.com/Big%20news.png",
        props: {
            Developer: "Anthony C.",
            link: "<a href='https://sites.google.com/view/biggestsite/home?authuser=0'>View BIG Sites HERE</a>"
        },
        description: "BIG News is back and stronger than ever! (picture above is not the current site) Check out the BIG things happening world wide and all of our BIG features. We are the BIGGEST and best news!"
    },
    "wordle": {
        title: "Wordle (Image Pending)",
        link: "wordle",
        image: "",
        embedLink: "https://wordlegame.org/",
        props: {
            Developer: "wordlegame.org",
            Objective: ""
        },
        description: ""
    },
    "snowrider": {
        title: "Snow Rider 3D (Image Pending)",
        link: "snowrider",
        image: "",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://cdn.jsdelivr.net/gh/sk1bx/89574567@71f165531792ae450fe0a522a52ba4e827344de2/sr3d.xml",
        props: {
            Developer: "",
            Controls: "",
            Objective: ""
        },
        description: ""
    },
    "impossiblegame": {
        title: "The Impossible Game (Image Pending)",
        link: "impossiblegame",
        image: "",
        embedLink: "https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fthe-impossible-game.xml",
        props: {
            Developer: "",
            Controls: "",
            Objective: ""
        },
        description: ""
    },
    "geometrydash": {
        title: "Geometry Dash (Image Pending)",
        link: "geometrydash",
        image: "",
        embedLink: "https://geometrydashlite.co/game/geometry-dash-lite/",
        props: {
            Developer: "",
            Controls: "",
            Objective: ""
        },
        description: ""
    },
}

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
            var desc = `<p style="width: 100%; color: #FFFFFF; font-family: Poppins, system-ui; font-size: 20px; font-weight: 500; text-align: center;">${games[req.params.game]['description']}</p>`
        }
        res.render('game', {title: games[req.params.game]['title'], embed: games[req.params.game]['embedLink'], firebase: process.env.firebase, propsBool: propsBool, props: props, descBool: descBool, desc: desc})
    } else {
        res.render('404', {link: req.params.game, firebase: process.env.firebase})
    }
})

app.listen(port)
console.log("Server started at http://localhost:" + port)
