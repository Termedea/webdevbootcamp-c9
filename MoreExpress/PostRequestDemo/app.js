var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var friends = ["Amy", "Tony", "Jenny", "Justin", "Pierre", "Lily"];

//tells express that we use ejs so we dont have to specify it.
app.set("view engine", "ejs");

//tell express to use body-parser to parse post data
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
   res.render("home") ;
});


//friends
app.get("/friends", function(req, res){
    
    res.render("friends", {friends: friends});
});

app.post("/addFriend", function(req, res){
    
    var newFriend = req.body.name;
    friends.push(newFriend);
    
    res.redirect("/friends");
})

//tells express to listen for requests (using env variables from cloud9, which decides the IP and port for us)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started, listening on port "+process.env.PORT);
});