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
    
    req.open('GET', '//http://ecomvicky.imad.hasura-app.io/counter', true);
    req.send(null);
};
