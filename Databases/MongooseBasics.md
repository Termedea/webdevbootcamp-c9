## Mongoose Basics

* What is Mongoose?
    * Mongoose is a ODM - Object Data Mapper
    * A npm-package to help interact with Mongo Database, we write javascript and that javascript interacts with the database.
* Connecting
    *  mongoose.connect("mongodb://localhost/cat_app");
* Create a structure for an object
    * var  catSchema = new mongoose.Schema({
            name: String,
            age: Number,
            temperament: String
        });
* Create a conceptual model with the functions we need to interact with database    
    * var Cat = mongoose.model("Cat", catSchema);
* With Cat-object we can create, find etc. They have callback functions for when interaction with db is done. 