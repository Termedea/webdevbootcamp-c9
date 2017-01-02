var express = require("express");
var app = express();
var request = require("request");

//tells express that we use ejs so we dont have to specify it.
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("search");
});


app.get("/results", function(req, res){

    var search = req.query.search;
    var url = "https://www.omdbapi.com/?s=" +search;
    
    request(url, function(error, response, body){
        
       if(!error && response.statusCode == 200) {
           var parsedData = JSON.parse(body);
           var movies = parsedData.Search;
           
           res.render("movies", {movies: movies});
           
       }else
       {
           res.send("Error:" +error);
       }
    });

   
});

app.get("*", function(req, res){
    res.send("404");
})


//tells express to listen for requests (using env variables from cloud9, which decides the IP and port for us)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie app has started, listening on port "+process.env.PORT+" !");
});