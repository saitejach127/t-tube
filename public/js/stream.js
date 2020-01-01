var torrent = document.getElementById('torrent');
var a = document.getElementById('tag');
let tor;
var client = new WebTorrent();
client.add( 'https://t-tube.herokuapp.com/static/torrents/' + window.location.search.substring(6) + '.torrent' , (torrent) => {
    console.log(torrent);
    tor = torrent;
    torrent.files.forEach ((file) => {
        file.renderTo('video#video');
    });
    torrent.on('done', (e) => { console.log('done') })
});
