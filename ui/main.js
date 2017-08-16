// Counter on click code 
var button = document.getElementById('counter');

button.onclick = function() {
    // Make request to the counter endpoint
    var req = new XMLHttpRequest();
    
    // Capture the resp and stroe it in  variable 
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                var counter = req.responseText;
                var span    = document.getElementById('count');
                span.innerHTML = counter.toString();
            }
        }
    };
    
    req.open('GET', 'http://ecomvicky.imad.hasura-app.io/counter', true);
    req.send(null);
};

var nameInput = document.getElementById('name');
var name = nameInput.value;
var submit = document.getElementById('submit_btn')

submit.onclick = function() {
    // 
    
    //Capture list 
    var names = ['name1', 'name2', 'name3', 'name4'];
    var list = '';
    for (var i=0; i<names.length; i++) {
        list += '<li>' + names[i] + '</li>';
    }
    
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
    
};