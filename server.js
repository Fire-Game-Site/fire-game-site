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
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABmFBMVEX///89Xf//iir/wI3MzMzo6Oj/rWr09PTW1tbPz8/i4uLe3t7s7Oz6+vrS0tLb29ucnJyXqP83Wf8xVf8/X//3uIXur3wnT///p1z09v+jrv8uU/9Ub/9pgP+iRgD/iSjxupCAkf9nZ2f/gAAAKu1whf+IiIhvb2+Tk5O2wP91dXV/f38iTP90dHSdnZ3n6v8AHO2xsbHX3P//9/GiOQBfd///sXKGl/8AAOxycWiiNgDufiPHzv+qtf/r7v//6dpKZ/+9xf//2b6Eg3wNMe//3srUaxm6c0u2VQnEy//c4f//wpNief//zah7jf//489HYOhUZcpmbJFZZ727u7v/nFT/kDnDhmXXsp/KZBXjdh/TgUbp1cp4iOzGzPGJl/PqvZyVoOK5vuK7vtjQ0uCFjdkgPOlda+eIkNYvQMZbY6Jiap09UtlKVK1sbn5NYtokPNlEU8ZrbnyRk59yebk3Rr+nreHrn23wl1jZwbLJlXjSppCzYS2YUSemd1l0Y1uKW0PnhjqVdWGkbE6fiHy0YzK8YiGyn5QU97F2AAAWjUlEQVR4nO2diXvaSJbABQHfBiHhFrYwJIAlgQBjgwEf2NgmthOCncNn4o53pnvo3WQnPZud3e4cnWx7t2f/7a0qXSXQAcGwwp/f9+ULSE9y/XhVr96rKpUIwlAmp4yPY+KbtlXx2GpMj9uqTPltVSa8tiptckdI3BEiuf2E9sUfbsLlyvel0tyGpY4dYT5PjNoTei0JJwxlzG98vERRJfnj+KSxiiTeCsXQFEXTjOu19P1B6UcDPY/VTS6LoVB90melIpV2zOIk4DeQqbFJw8NXjMvFPphCn8cnDC+VJcy6ZKHSPwLteYai0z9Otel52g9pf24ESOifxixUJD2/3+KsiWVNaukCBUoclj5b1tIrFdDlYpYJYhb8NC56rk3PupaGIOL9SSsVJNa11Fh6JERAQJVlaWC62X4T3qCn6ZTwkUR4tbFReXAITPiNhDshIN6B+tJOCedoWDsf+9QD30ZIbO3sTHfgS/8fCEsUBMJ6/G8khDLY/rBTwgeQMDg8hLMbyUrlEfAXRoTTy8lkcmNTf7kd4eNKZVa6elz+2nIDWfI7D1t7/K2jnZ2HW3ndsR4JFw/TDEvTbLo02074+JBhWJZl0tWkesEVy1LI0bA0y8zPGhBW0uDMokqYTLNsetmgFNDTjOCeZqsekmXm4Y0RVtKU3K/R9OJhC2FJPUkx1UXp+EbahQl7ZUAINeiSSliFd10wKEVrb1FHByQJFTU79kQ4h5WXooIuHWGYxlgoySpEksUJ6QcGhPALpRGGIeG8PWERA4SMKmIvhMtplU61lkr4BAHSDMPQksq0BIPVUja9YU9Y7YywrgcEovi6XgjDlGQe18JhlaF0hP45ZCwmsLz4uBKk1YpHzCa3nyBPs/2nZPIxcVOERxJgaKbRUFjrvRNKJqTDyA0srtA6G6K4hZZbH/RBLmZWvtzGl34TYRFBya2vEcLraQ+EAchErShH5ymM8E8obtlWzsFTrOJQ+0CYR1+KyqkGItzpmXAFWWZRObrIYIQLEoUiV7RS6v4Q7sAvoYf6czM9EzI6ExIE7ktRuUrqqQokfNI/QsloWhx1D1XaXglnUcd1pR2ex/pD5HfCC/OSLCCXr/wYfSDEiVqJeyUMaIcXWglhLyKLCytmHwhndM1Q9jWyq+kroU5YBeEWEYIsXpN0WGkmt4eQWthOqrKtBc9DRoh5GpyQbqHHZRCEIzdBKBUF+9t4jExpcVqbdEJ4CD91HnnXEZF2Dv/ec4+vxGJyOWWbhjF7dkmImnAVfoKEs62/oyGhVCu31HMjmE17jtrU1K0Ev7JyoIbGYhijxNWWcEW9FBKiu9oSbuFBjBzijDR6JlyUIu8FNMYwXUKxtmLSP6NvlBrSVZ5oVdaGEDG5gjDvGJPvqhHmNTvpIm8ps6jjgIpJe8meDqV0gnlydbXASumgwuFHKRLFXL1eXHy8MRdkKUb1OzaEGxIUEy6VVqS7qoT5kVAodGREuCOnTI2dnYacCyuOpxfCWVoOXWj5g9YqxzalQzADlnJgyXl0QEgEtYBIDhYUwiIefuoz4KKS2yuZsJrk9zSK8ZjRxS6UNmLkm24559LO2RHqxnJonFBXdD1hfkQvqql7HIlarGIcNP1YVfFNE5sr+DlWmyp8QLcSQiRWGy/VxreodDLcGSGRn8FHoka09trreGmymmZpICxD4R08Gk18tCKfSwfnsBHi5TRNpyv4LPchPLKIaYTlC4Mbuh4ftjbFnaAeInSJzcwcFZXRxOIOVpTex7wXk4FSKVDR9wzyiPDm9hw4l1zUnSMeB0qP9PP4yVJAr7O4PRcIVP5MtMQ0W42GluYeNRp5/Yhw/mgHyFHvI8ITA1qpQMDJG9OYBknPs9xjhjLuMz6OicdWo0MVPxo5mPebaPjGbW/isyotMWoofq/xcUx8U7YqHluN0fHR0U0pFsybaHjHbG8yOWFx0sSyA1tP45OHtNhtM5XBzh/i0iPh8lxl4/Hm5g+PpKmBtOndHLyexpKwkobdD6PMALAmiSYxvIRVfahUNdccVsJ5nJAJz5prDivhIsPS0igkzdAVq5sMKyExm7xaWAmHwwuB19Y3GVpCWcZsNYac0CFrMYzljpC4I4RyR0j0n3B63KyYt4RQiKViJiS3hZDLpnzGKreE8FgkuSVjlVtC6OVJIWWscksICV4gY8YDAbeFkOTIlHFBh5AQHylRCT0pkssaqg8f4VW5pg35qoRTMVLgDfWHjnCzXEuU1bXIWkyTEkje8AZDR7iSY9mcOh6kEWY5Ujw2umDYCDfKtSCVU4fWNUIfaIiC0RXDRlhLUC5Xoqp81QinYyRp2BCHjPAqlw66grWc0hCx3EIEDXHC4JLhItzM1Zi0K8gmcvKwF0a4JBo3xOEi/CnHuppNBiI2UbeIEfozpMBJHzc3sCnAoSJcBm4m6GKaTZermSg3K7r5Q9gQY+jT9+Vyuak+OTJUhM0E7XJBRsoVpJqJXO7BD9gkKyeQGfhXHpRrafADPJXJholwLtcEdLUaaIkINF3L5VxJdaAdZFAiyKBel2vgJFXLNaXDw0R4WE7UgOESuQQThPOxwSALvy+gtRWzmz+CDEqEhkZLSILNnLQK7GZGhO0Je57l9ng8vr8Aw/wF/JfL1eQJkyCVBpCJn/6WK5dzqyS5+s/fw/4EnaqVf/AMkcickj1mfyon2KDMGGzWEolErdasPRfI3X/J1ZqUdEoO7nxm88fYr2erMfj8MFlOyKaiaolamg5CebFLcm9qgLdGo3O5n6DqoNrhTc9yL9ZyNURYSzSDsjmfroIMCtgOMDaBMwomXFATJ5xcEo2SSCfaEMhT1BhZAKjOYPICufoUVFwa2BU4owQN9RRC77EQ40UhZnArhxISpXKCDqYT2LOFbzly9xlqnAwwYzCBngWChFMekudFjiTJrFHs6lRC2BhZ0DdoNnwGGuJb2ccCMyZQO/R4spmYCMIBIILIxwwK4lhC4nUOYGA2rIL+gpc/B0HMUyLGlkQ+JdNxAHTJsBjOJQT+JpFgsKUE76WGKCH+61+fxzKiTJeKpZbGzLyqgwkJfxP3NK43KT6z+hYcePri+erqLqIjOTHGZz1WvaKTCSe8tYQGGHwPncnuu7e8Qifs8jHh2G4KzsmEk/mrnFpNqbe7CEsUZbrd1ed/9dqvMXA24dQmyBllC/68SkpofFbgdlffvXjmquUC/iHKLQwE5PiHKNSGDW83IxGS/Or7N89c1fe7zwHiD0NPOJv7m+xWsrzc+N5XpRiOFN4yiad527s4mdA76cmqTlNYlRrg7gtYZ5FBd6u1svFmHbg4lnDatwS6Obk/h27lxTvAKojPUQSHDu8+Y3LmCyYVcSThtH9JVOmgW3nzM3Q4L97zGWTCnyW3KryhEkHbmzmPcOKY00cr/1ZLqxlUVnhPuaj3slt9E6zlbO/nLEI5CZKjFV6KVko5kBBLjHAoo6qYkBReAELRaCgcF0cRHsdQEiSlCcKxFIyBPhGkElKSAYcynlHP5X5j92mwlhBjpPVIhqMI/ZkspMvEuGNoGWlEGA6Fo6QXtkQ4lEEpJnznciVqWSFjPHmqiKMIiRhoeOKSEoqhUX04FI6S3hobDMKhjPdV2c9kquDwzyCOM5x3U8VZhEvZcazKIcLDHHoEzdUEjIw0lJFCHci7apBK5P6dFGLWsbezCPWCCJsJeYSUAoyJN3Ao4+nz9+/e/hwEFsz9HURxJouJFHE8IaUkUHCkP/EfcCgjzcCNvUCan/h7luSsW+EQEFbKNQWRrZW/h2OKOSTl2hW/KpAxOwLHExIr5RoLDBika7nyHFyVsfqflUBgDm7+NJ0FvafdXZxPSATKuQToEnPlp4vAF3GkiJXZQ9qush0CQmL2qpnL1RbQUiJfRrcqw3T8SZNhIISFUCYStclgJMM0f2gghuu84aoM7bHj20ioX5VxGwn9vLoqgxje2TVZDAlRQ1S5hmaGtIv5Yh9oiKml8S6uGPcB6XZa+obF7Fcx7OvkVRmSdFBLfZvJwNwjK72bqaU3t5/3hLQqQxJ7ws0ncGcIlrEYsnKYpwFJJLau3ZZQ3fqENdlriXAgocCRKaVMdoSzrPqoL220hS4SxxHCB0yUJQl2hA+wKda02TsgHEcI17UrD5jYEE7jm+wY7oOMtJxGiB4wkU/ZEC7jc8gu2kTLeYRZLYOyIXyk2xI6baLlPEJPKqtkUDaEGzobMiZaziMcjfG8HHzbEG7q2uGKiZbzCIkx9WZ2vnQF2xdC3UK5VRxIqIkd4bJmRMp0mmqoCYmKup+7tpt0qww3IbFNs3BrDyZsPls85ISEJ7kQDpes3mk19IS2GneExB0hkjtCI7kjJO4IkdwR3hEiuSMkhoywffO9W0VYCafT6fmWfT5vEeFikJX2QF/RGfL2EG6qO2fTVVzl9hCGsa3B8ZdK3BrC1/jYXBqrp7eGsIS/hw8fubo1hE/wLVvxt7v0PMttvEW032r/aEluZLfrqXH5Q35FR4jtfd3zbtfG23yrO5b7/ee//Prrdx8mjfYat5MuVPyHOsI5bP/yXncsN7G7Uku3TuNRIPFQ2/MjN1xLt3WeBht+7PMs90486kYSjbYi3nRvgdlQfUMdlP56mnzcrUj0tEXlpgmxt3ow+ABrfwlHoiqhO97Qq9x41LYtv9WDZnWvmegrIWZCYMQTvcrNR96LC2n4ypqSPr/oK+ERTuiO61X6kT3NLm+0vUCqr4Q7gyY0kttlQyNRCf2mC+m+nXB6sO3QWGTCaTLGman04EuLuC/d0asMmFAUsxnTVXi99IcqYt/7QzORCcd5UjDb0riX3OKhGtO4+x3TmInSDgWO5EhjlZ6yJykujcdH2ngGTTgK1+8a+9Ue88OjerHY2GpXGbgvPU6RQsZQxXkZcGPk9GQGvZmrq/5QFLAFvLg4jXAnLiVkJ/kuCSdgPTUqmMMIG6rziue7jGmyIskZdYrOItzSJWRdRm28QPLYTU3e8HhsGhpg0j/CE30Q0R2hvlM8W4ucnV8SLTm+V0ylDLcF1kvfCFsTsi4jb44jRaVT/Fg4OIgUCoX9Tx8wwqUYR5ptso5L3wgf6gij3eYWWKf4qXAAbrG+ByjXLpXzY7wId5mxfgAbSd8IWxKyrrMntVM8XztQ7vKy8Ek6OSrAXVhEvoPNgQZlQ3e3hB8+xqRO8YMG6HZHPqOTx7CCcjGbx69lGVA7HOmmHU4Tl6DZ/ZYhSf78vIABui/W8sjDCMC+Yoc9R/98qS4he9iFDS/XDgqRPXf8C0cKXwuRg4uX61o1PZc8DBfrwItK0j9CPCEb6ag/lB7qvARQB+vu3/f3QVsT9y8OIkAu9hBlNPIlJXkYex+qSB9jmiMFMX7S2ZNdSyny2OuNRABMdF8UBA44Gx5aTqI82Ftf/5rq2MMo0s+4NH8CA9N4HL4nvRNCThQzoFoiQLT/SgpkitfSzwQ7i8h/8Rzcq6MzD6NIf3OLrUa9voNCrk4IYQ8QibwEPKfyhnE8SWZeKZX9d7SLlbj629m5/d5cmjhoPY03pgBGr+XdcUQRUEal/uYL/AE4fh/1/B9t76aKgwg9fPY34EM1E0KDAWdzBlOwVyiGyVyfQt71Ay24sRUHES6J2f+GjRC0QkEmvP6dB2ZbvX51LXkYpcauK8FNB+IgQpHL/g+yYfRalDaEFc6iX+CWVkIqlQXV9UtUaZIvCx8MbuA1lLFJ4+OYjE/YqnhsNTpQifEiF4ERTHQX8ADHynGvoq+kCpvhxK+/ayHEReFSu27q8tI7NTXlJSYMZcxvfByT8UlbFY+thr2Kd2wpm/otAgnlZiikTqPX8qZk/D404IXc9R9EvNqFvrVC4fOXc7MgzkG1dBTENB8KLzVCcjca5WXYL8iAkYjU9UfOsOs+FC4uIhFT3+MgQhiX5mGgHZU3GiO/nF7Le1VyZ8iHgmaKuv5I5PPHD0qn+BHafa8wJITEfkTrDoVrnuNS0najqBHuRdblAAcYrbB2IA1t/OMAtUyzUjqN8HwtcuF+xUlbqcHaymc4geNTyIYXES1dWYfRKhraABeAlvnZ7LZOIyTO/4isR1dR7yfFML9/gVUVGfEAzxVRr4Gq7EtYf02jHMcRwvTQ7f4iqjEMEJApcl+jAONASxW1ngNWXeMOEonzCImzwsXLlhgGGDEFPuOpoioHESX5NxYHEhIf5SzpTM2gX8mZopYqvlQJpWZ4YHpbBxJOcLCCpr5+1sYvotdapggrK3AxyujGOgr0dB2kXpxHmI0JaBzmw35Eq5SnMFNUwjbgVbbOP/4DhDLgrNwMz01v6zRCnzTSS4K/mV+70MYvztRMUfUq+Q8f/wCQ1v290wjlkd6MZM3PEal7R5RwWEpqmLhXmb5EsfpBxPy2DiIcnWwZ6f1UULwmCGJ+A8EN/w9YZXU4+QJqhvvmt3UQoT+TQoGMWqJLVHpFoLP5CmvlGt7mzmGobpkQO4cQeRhRt80mHsNcRMD51P+e7+/r+vYzu2boGMIJ5GFipO5vfdTi0L3Cvoc3eBfsPug29g7WLIo4YMKtxkzxvsF6DzTQpngYVUAAJ3eJe5E/pDnF1ncx5T/tg/D7D4u/PFDC/AhauxA/NWBcysTa3yT18aAA+/a9PTTpNAXnFCfbL720HD8dJGE+qi5deNiukfUb7Yuev/wEOr3CAWKAc4omLw83l0ESnmpTNXGDX918rb5qpBTcC9D2b+llgIQNbEYxGmpX6WAFrY83WWhjIQMkdGMTim4DI3ZAOMWZLLSxkIER+vL6if2dNpUOCL0TLQttOpBBERLjDT1ho02jk3XeU1arT41lQIQPi1EdoDt62mbEzlayG3WKljIIwofFeDzqbpFoPFrXt8XOCOFCG95eU5O+Ex7NRNvxJMZovIh3/R0+jXCcEuy2+ddJfwkRXlQlaoeMn2iVtdPnLVK2m+Drr7GfMP5Wwq0Ztw7vJKT1+G4tvInel4vQKeGoWXnaNzEgiO2r+YVA2+M5LfJNhFt1HV705Jd6vT4SRYfAt/rMSVQ+HY3LlbXnZ2aYYAm+CQCTJM3QFEUzVWvG7gm36qd6vOK9+nf3oJwgYxbr9+7V74UwQ8LK2jOhy0WxDLtyta08tllSN5JLb1td2CWhER5gkwjRx/o9WYqnGqO7MWWQNnRJiGhogDk/tzFLBLCnVdNWVuyGMN8wxNMI9YIqq8IY/8UocdSJ9VOy2NO3oGamq/hj8VR1wm8mk+Omp1QVD/g3OXF5/0Tr+ADe6a/fdSC/RvHKOjE5afF3fGMWZwm475/LTNjt0SkTGR33mp1SVTyjo5f39dY7HZnRyXczpoJX1uj9KdOSTE35Jy1KQQRKCytBM0rdBhXfUEsbJy14WmO7Z1FLlcpa1CprND5j3oFZ19IAkLlAaT7sotsxTXdWNSLMHx3hLSbfaKmc7Xg2hK2eNWQwBIDE2tMEZJkLXB3OV1sYKfO9xlsJjwBPPO6+L+PthDrAsyWEMoJV1tP21KNzQhlTj2i6S3Ub4YzEAwqRJ6Z3RjrD64hw5rsi7lmNKmsXhIG5sL4dVjokrKtJUPS0qMcLmeN1SAgrK+ZZR456IQzotqdwpS3exIkTbuFjLTq8GSu8Tglhg7SqrF0RBqp4Z2H1Ik6ccKQtP0B4v9jgdU54T+9Z43FdEtkd4ZX2smpq3upCnDDeBgitV7cvfheEMNQJaT9gfETzrJaE/wcuNdOxcpRDuAAAAABJRU5ErkJggg==",
        embedLink: "https://defly.io/"
    },
    "paper.io 2": {
        title: "Paper.io 2",
        link: "paper.io 2",
        image: "https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/d2708e8aa31df3fe7b211bca36405d6d.png",
        embedLink: "https://paper-io.com/"
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
