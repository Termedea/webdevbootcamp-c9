var express = require("express");
var app = express();


/** Routes **/
// "/" => "Hi there"
app.get("/", function(req, res){
    //req and res are objects. req contains all info about the request and res will contain what we're responding with. 
    res.send("Hi there");
});
// "/bye" => "Good bye"
app.get("/bye", function(req, res){
   res.send("Good bye!");
});

// "/dog" => "MEOW"
app.get("/dog", function(req, res){
   res.send("MEOW!");
});

//for dynamic content we use route parameters or path variables. Use : before the parameter
app.get("/r/:subreddit", function(req, res){
    
   res.send("welcome to the " +req.params.subreddit +" subreddit");
});

app.get("/r/:subreddit/comments/:id/:title", function(req, res){
   res.send("welcome to a subreddit "+req.params.subreddit+" and it's specific article " +req.params.title) ;
});

//needs to be last, since the first route that matches is the one that will be run and this covers every address. 
app.get("*", function(req, res){
    res.send("404");
})

//tells express to listen for requests (using env variables from cloud9, which decides the IP and port for us)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started, listening on port "+process.env.PORT+" !");
});