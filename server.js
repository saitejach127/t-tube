var express = require('express');
var createTorrent = require('create-torrent');
var fs = require('fs');
var app = express();

app.use('/static',express.static("public"))
app.use('/torrents',express.static("torrents"))

app.get('/',(req,res) => {
    createTorrent('videos/download.mp4',{ urlList:'http://localhost:3000/static/download.mp4' }, (err,tor) => {
        fs.writeFile('torrents/seed.torrent', tor,() => { console.log("created") });
    });

    res.send("<h1> Welcome</h1>");
})

app.listen(process.env.PORT || 3000, () => { console.log("Server on 3000") });