var express = require('express');
var createTorrent = require('create-torrent');
var fs = require('fs');
var multer = require('multer');
var cors = require('cors');
var path = require('path');
var app = express();

app.use('/static',express.static("public"));
app.set('view engine', 'ejs');
app.use(cors());

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage }).single("file");

app.get('/',(req,res) => {
    res.render('home');
})

app.get('/upload', (req,res) => {
    res.render('upload');
});

app.post('/upload', (req,res) => {
    upload(req,res, (err) => {
        var msg = {};
        if(err){
            msg.message = err;
        } else {
            msg.message = "success";

            createTorrent('public/uploads/'+ req.file.originalname, {urlList : "http://t-tube.herokuapp.com/static/uploads/" + req.file.originalname}, (err, torrent) => {
                fs.writeFile('public/torrents/' + req.file.originalname +'.torrent',torrent, () => { console.log('created') });
            });
        }
        res.render('upload', msg);
    });
});

app.get('/stream', (req,res) => {
    console.log(req.query);
    var hash = req.query["hash"];
    let buffer;
    fs.readFile('public/torrents/' + hash + '.torrent', (err,data) => {
        buffer = data
        res.render('stream', { torrent:buffer });
    });
});

app.listen(process.env.PORT || 3000, () => { console.log("Server on 3000") });
// var server = app.listen(3000, '192.168.1.35',() => { console.log("Server on 3000")  });