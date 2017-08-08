console.log('Loaded!');

var element = document.getElementById('main-text');

element.innerHTML = 'JS: I m alive !!!';

var img = document.getElementById('vicky');

img.onclick = function() {
    img.style.marginleft = '100px';
};