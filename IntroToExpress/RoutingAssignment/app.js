var express = require("express");

var app = express();

// "/" should print "Hi there, welcome to my assignment!"
app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});


// "/speak/pig" should print "The pig says 'Oink' (5 different animals with corresponding sounds" (DRY)
app.get("/speak/:animal", function(req, res){
    
    var animalSounds = {
        pig: "Oink!",
        cow: "Mooo!",
        dog: "WOOF!",
        cat: "Meeeooooow!",
        fish: "Blub!",
        fox: "Hattie hattie hattie ho!"
    }
    
    var requestedAnimal = req.params.animal.toLowerCase();
    
    if(animalSounds[requestedAnimal]){
        res.send("The " +requestedAnimal +" says \"" +animalSounds[requestedAnimal] +"\"");
    }
    else{
        res.send("The animal \"" +requestedAnimal +"\" does not exist!");
    }
});


// "/repeat/hello/3" should print a chosen string (hello) a chosen number of times (3)
app.get("/repeat/:phrase/:times", function(req, res){
    
    var times = Number(req.params.times);
    var phrase = req.params.phrase;
    var returnPhrase = "";
    
    for (var i = 0; i < times; i++){
        returnPhrase += phrase + " ";
    }
    
    res.send(returnPhrase);
    
});


// Any other route should generate "Sorry, page not found... What are you doing with your life?"
app.get("*", function(req, res){
    res.send("Sorry, page not found... What are you doing with your life?");
})

//tells express to listen for requests (using env variables from cloud9, which decides the IP and port for us)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started, listening on port "+process.env.PORT+" !");
});