var submit = document.getElementById('submit');
var hash = document.getElementById('hash');
submit.onclick = () => {
    window.location = window.location.origin + "/stream?hash=" + hash.value;
}