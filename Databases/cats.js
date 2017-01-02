var mongoose = require("mongoose");

//connect to mongodb. (if cat_app db don't exist it will be created)
mongoose.connect("mongodb://localhost/cat_app");

//construct a pattern for how the cat data should be structured
var  catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

//took the catschema and compiled it to a model - A Cat-object, which we use for adding, deleting etc. Cat.delete.
//"Cat" should be singular, the collection will be automatically pluralized to "Cats".
var Cat = mongoose.model("Cat", catSchema);

//add a new cat to the database

//create a cat on the js side.
//var newCat = new Cat({name: "Mrs. Norris", age: "18", temperament: "Evil"});

//trying to save, callback is called when save is done. returns error and the saved object from the database
/*newCat.save(function(err, cat){
    if(err){
        console.log("Something went wrong! " +err);
    }else{
        console.log("Cat saved!")
        console.log(cat);
    }
    
});*/

//alternative way to create, without first creating the javascript object of cat
/*Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    }else{
        console.log(cat);
    }
});*/

//retrieve all cats from database

//using the model and to find cat posts
Cat.find(function(err, cats){
    if(err){
        console.log("Oh no! " + err);
    }else{
        console.log("All the cats:");
        console.log(cats);
    }
});