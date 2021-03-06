var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var multer  = require('multer')
var cloudinary = require('cloudinary')
var cloudinaryStorage = require('multer-storage-cloudinary')
// You can store key-value pairs in express, here we store the port setting
app.set('port', (process.env.PORT || 5000));

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
        password: "pwd",
        following: ["john","dtrump"],
        followed: ["john","dtrump"]
    },
    {
        id: "xvj2f2",
        username: "john",
        password: "doe",
        following: ["test","dtrump"],
        followed: ["test","dtrump"]
    },
    {
        id: "1",
        username: "dtrump",
        password: "pwd",
        following: ["john","test"],
        followed: ["john","test"]
    },
    {
        id: "3",
        username: "HillaryC",
        password: "pwd",
        following: ["john","dtrump"],
        followed: ["john","dtrump"]
    }
    ];
var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: '', // cloudinary folder where you want to store images, empty is root
  allowedFormats: ['jpg', 'png'],
});

/* Initialize multer middleware with the multer-storage-cloudinary based
    storage engine */
var parser = multer({ storage: storage });
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
            tags: "#election",
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
                username: "donaldtrump",
                profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg"
            },
            image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            likes: 892,
            caption: "test on #elections",
            tags: "#USA",
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
            id: 2,
            user: {
                id: 1,
                username: "Trump",
                profileImageSmall: "http://core0.staticworld.net/images/article/2015/11/111915blog-donald-trump-100629006-primary.idge.jpg"
            },
            image: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            imageThumbnail: "http://media1.fdncms.com/sacurrent/imager/u/original/2513252/donald_trump4.jpg",
            likes: 892,
            caption: "Always winning #elections",
            tags: "#election",
            comments: []
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
app.post('/signup', function(req,res){
    console.log("test");
    console.log(req.body);
    var u = users.push({id:"oidsfe",username:req.body.username, password:req.body.password});
      // req.body can be understood by bodyParser :) it helps us get the data from req.
    if(u !== undefined)
    {
        return res.json({id: u.id, username: u.username});
    }
    else
    {
        return res.sendStatus(401);
    }
});
app.post('/posts', function(req,res){
    console.log("test");
    console.log(req.body);
    posts.unshift(req.body);
});
app.post('/search/tags', function(req, res) {
    console.log(req.body.tags);
    var taggedPosts = [];
    posts.find(function(post){
         if (post.tags === req.body.tags)
         {
           taggedPosts.push(post);
         }
    });

    if( taggedPosts.length >= 1)
    {
        return res.json( { tagname: req.body.tags, tagposts: taggedPosts, numbertagposts: taggedPosts.length } );
    }
    else
    {
        return res.send("no posts found!");
    }
    res.sendStatus(200);
});
app.post('/search/user', function(req, res) {
    console.log(req.body.user);
    var FoundUserPosts = [];
    posts.find(function(post){
         if (post.user.username === req.body.user)
         {
           FoundUserPosts.push(post);
         }
    });

    if( FoundUserPosts.length >= 1)
    {
        return res.json( { username: req.body.username, foundUserPosts: FoundUserPosts } );
    }
    else
    {
        return res.send("no posts found!");
    }
    res.sendStatus(200);
});
// start listening for incoming HTTP connections
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
