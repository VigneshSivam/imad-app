var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'ecomvicky',
    database: 'ecomvicky',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-ecomvicky-53977'
};


var app = express();
app.use(morgan('combined'));
var blocks = {
   'block1': {
    title: "Block1 | Vignesh Sivam",
    date: "7th of Aug 2017",
    heading: "Block 1",
    content: `
    <p> 
        I did a blender mistake while editing and delting, so i should think b4 any deleting operation thrice
    </p>`
    },
   'block2': {
    title: "Block2 | Vignesh Sivam",
    date: "8th of Aug 2017",
    heading: "Block 2",
    content: `
    <p> 
        I did a blender mistake while editing and delting, so i should think b4 any deleting operation thrice
    </p>`
    },
   'block3': {
    title: "Block3 | Vignesh Sivam",
    date: "9th of Aug 2017",
    heading: "Block 3",
    content: `
    <p> 
        I did a blender mistake while editing and delting, so i should think b4 any deleting operation thrice
    </p>`
    }
};


function createTemp(data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemp =`
        <html>
            <head>
                <title>
                    ${title}
                </title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            <body>
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </body>
        </html>
        `;
        return htmlTemp;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);

app.get('/test-db', function(req,res) {
    //make a req 
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringfy(result.rows));
        }
    });
    //get a response
});

var counter =0;

app.get('/counter', function(req, res){
    counter = counter+1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req, res) {
    var name = req.query.name;
    
    names.push(name);
    //JSON: JS object notation 
    res.send(JSON.stringify(names));
})

app.get('/:blockName', function (req, res) {
  var blockName = req.params.blockName;
  res.send(createTemp(blocks[blockName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
