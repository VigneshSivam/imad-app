console.log('Loaded!');

var element = document.getElementById('main-text');

element.innerHTML = 'JS: I m alive !!!';

var img = document.getElementById('flower');
var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 10;
    img.style.marginLeft = 'px';
}

img.onclick = function() {
    var interval = setInterval(moveRight, 100);
};