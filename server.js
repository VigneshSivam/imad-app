var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'ecomvicky',
    database: 'ecomvicky',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: 'db-ecomvicky-53977'
};


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt) {
    // How to creat a hash 
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ["pbkdf2sync", "10000", salt, hashed.toString('hex')].join('$');
    
}
app.get('/hash/:input',  function(req, res){
   var hashedString = hash(req.params.input, 'random-string');
   res.send(hashedString);
});

app.post('/create-user', function(req, res){
   //Username and password
   // {"username": "Vignesh Sivam", "password": "password"}
   // JSON
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password, salt);
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function(err, result){
        if(err) {
          res.status(500).send(err.toString());
      } else {
          res.send('User successfully created :' + username);
      }
   });
});

app.post('/login', function(req, res){

   var username = req.body.username;
   var password = req.body.password;
   pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result){
        if(err) {
          res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0){
              res.send(403).send('username is invalid');
            } else{
                //Match password
               res.send('Welcome buddy!!!');
               var dbString = result.rows[0].password;
               var salt = dbString.split('$')[2];
               var hasedPassword = hash(password, salt);
               if (hasedPassword === dbString) {
                   res.send('Welcome buddy!!!');
               } else {
                  res.send(403).send('Password is not correct');
              }
          }
      }
   });
});
var pool = new Pool(config);
app.get('/test-db', function(err,res) {
   pool.query('SELECT * FROM test', function(err,result) {
      if(err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   }); 
});
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
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}
                </div>
            </body>
        </html>
        `;
        return htmlTemp;
}


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

app.get('/articles/:blockName', function (req, res) {
  var blockName = req.params.blockName;
  // /articles/'; DELETE from "article" where 'a'='a'
  //pool.query("SELECT * FROM article WHERE title = '" + blockName + "'", function(err, result) {
  pool.query("SELECT * FROM article WHERE title = $1", [blockName], function(err, result) {
     if(err) {
         res.status(500).send(err.toString());
     } else {
         if (result.rows.length === 0) {
             res.status(404).send('Article not found');
         } else {
             var articleData = result.rows[0];
             res.send(createTemp(articleData));
         }
     }
  });
  
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
