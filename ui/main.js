console.log('Loaded!');

var element = document.getElementById('main-text');

element.innerHTML = 'JS: I m alive !!!';

var img = document.getElementById('flower');
var marginLeft = 0;

function moveRight() {
    marginLeft = marginLeft + 1;
    img.style.marginLeft = marginLeft + 'px';
}

img.onclick = function() {
    var interval = setInterval(moveRight, 50);
};

var counter = 0;
var button = document.getElementById('counter');

button.onclick = function() {
    // Make the request 
    
    // get and store the resp 
    
    // render the output to span
    counter = counter + 1;
    var span = document.getElementById('count');
    span.innerHTML = counter.toString();
    
};