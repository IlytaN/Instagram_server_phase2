var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 80));

// bodyParser needs to be configured for parsing JSON from HTTP body
app.use(bodyParser.json());
app.use(cors());

// Simple hello world route
app.get('/', function(req, res) {
    res.send("Hello world");
});
// dummy users, in real life these would be in a database or something
var users = [{
        id: "txgw35",
        username: "test",
        password: "pwd"
    },
    {
        id: "xvj2f2",
        username: "john",
        password: "doe"
    }
    ];

var posts = [
        {
            id: 0,
            user: {
                id: 1,
                username: "dtrump",
                profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg"
            },
            image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            likes: 892,
            caption: "Always winning #elections",
            tags: ['elections'],
            comments: [
                {
                    id: 0,
                    user: {
                        id: 2,
                        username: "POTUS"
                    },
                    comment: "You're never going to make it don #losing",
                    userRefs: [],
                    tags: ["losing"]
                },
                {
                    id: 1,
                    user: {
                        id: 3,
                        username: "HillaryC"
                    },
                    comment: "Damn right @POTUS",
                    userRefs: ["POTUS"],
                    tags: []
                },
            ]

        },
        {
            id: 1,
            user: {
                id: 1,
                username: "dtrump",
                profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg"
            },
            image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            likes: 892,
            caption: "test on #elections",
            tags: ['elections'],
            comments: [
                {
                    id: 0,
                    user: {
                        id: 2,
                        username: "POTUS"
                    },
                    comment: "You're never going to make it don #losing",
                    userRefs: [],
                    tags: ["losing"]
                },
                {
                    id: 1,
                    user: {
                        id: 3,
                        username: "HillaryC"
                    },
                    comment: "Damn right @POTUS",
                    userRefs: ["POTUS"],
                    tags: []
                },
            ]

        }
    ]

app.get('/posts', function(req, res) {
    res.json(posts);
});

app.get('/posts/:id', function(req, res) {
    res.json(posts[req.params.id]);
});
app.post('/login', function(req,res){
    console.log("test");
    console.log(req.body);
    var u = users.find(function(element){
         return (element.username === req.body.username) && (element.password === req.body.password);
    });

    if(u !== undefined)
    {
        return res.json({id: u.id, username: u.username});
    }
    else
    {
        return res.sendStatus(401);
    }
});
// app.post('/signup', function(req,res){
//     console.log("test");
//     console.log(req.body);
//     var u = users.find(function(element){
//          return (element.username === req.body.username) && (element.password === req.body.password);
//     });
//
//     if(u !== undefined)
//     {
//         return res.sendStatus(409);
//     }
//     else
//     {
//         users.push(id:"oidsfe",username:u.username, password:u.password);
//         return res.json({id: u.id, username: u.username});
//     }
// });
// start listening for incoming HTTP connections
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
