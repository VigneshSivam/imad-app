// Counter on click code 
var button = document.getElementById('counter');
var counter = 0;

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
};
