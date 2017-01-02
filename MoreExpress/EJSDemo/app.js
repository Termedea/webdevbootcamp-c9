var express = require("express");
var app = express();

//tells express to listen in the public folder as well
app.use(express.static("public"));

//tells express that we use ejs so we dont have to specify it.
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/fallinlovewith/:thing", function(req, res){
    
    res.render("love", {thingVar: req.params.thing});
})

app.get("/posts", function(req, res){
   var posts = [
           {
               title: "Post 1",
               author: "Susy"
           },
           {
               title: "My adorable pet bunny",
               author: "Carol"
           },
           {
               title: "Look at this Pomsky",
               author: "Colt"
           }
       ]; 
       
       res.render("posts", {posts: posts});
});

//tells express to listen for requests (using env variables from cloud9, which decides the IP and port for us)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started, listening on port "+process.env.PORT+" !");
});