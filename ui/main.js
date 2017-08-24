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


var submit = document.getElementById('submit_btn')

submit.onclick = function() {
    // Make req
    var req = new XMLHttpRequest();
    
    // Capture the resp and stroe it in  variable 
    req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
            if (req.status === 200) {
                console.log('Logged in successfully');
                alert('User logged in successfully');
            } else if (req.status === 403){
                alert('Invalid credentials');
            } else if (req.status === 500){
                alert('Something wrong');
            } 
        }
    };
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    console.log(username);
    console.log(password);
    req.open('POST', 'http://ecomvicky.imad.hasura-app.io/login', true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify({username: username, password: password}));
    
    
};