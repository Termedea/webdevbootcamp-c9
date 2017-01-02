var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    methodOverride      = require("method-override"),
    expressSanitizer    = require("express-sanitizer");
    

/** Mongoose connection **/
mongoose.connect("mongodb://localhost/blog-app")
/*************************/

/***** Express setup *****/
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
/*************************/

/***** Model config ******/
var postSchema = new mongoose.Schema({
   title:       String,
   image:       {type: String, default: "https://farm4.staticflickr.com/3379/3486911146_c33eda44b4.jpg"}, 
   body:        String,
   created:     {type: Date, default: Date.now()}
});

var Post = mongoose.model("Post", postSchema);

/*************************/

/******** Routes *********/

//INDEX
app.get("/", function(req, res){
   res.redirect("/posts");
});

app.get("/posts", function(req, res){
    Post.find({}, null, {sort: {created: -1}}, function(err, posts){
       if(err) {
           console.log(err);
       }else{
           res.render("index", {posts: posts});
       }
    });
})

//NEW
app.get("/posts/new", function(req, res) {
    res.render("new");
})

//CREATE
app.post("/posts", function(req, res){
    
    //sanitize post body
    req.body.post.body = req.sanitize(req.body.post.body);
    
    //create post
    Post.create(req.body.post, function(err, newPost){
        if(err){
            res.render("new");
        }else{
            //redirect to index
            res.redirect("/posts");
        }
    });
    
});

//SHOW
app.get("/posts/:id", function(req, res) {
    
    Post.findById(req.params.id, function(err, foundPost){
       if(err) {
            res.redirect("/posts");
       }else{
           res.render("show", {post: foundPost});
       }
    });
    
});


//EDIT
app.get("/posts/:id/edit", function(req, res) {
    Post.findById(req.params.id, function(err, foundPost){
       if(err) {
            res.redirect("/posts");
       }else{
           res.render("edit", {post: foundPost});
       }
    });
});

//UPDATE
app.put("/posts/:id", function(req, res){
    
    req.body.post.body = req.sanitize(req.body.post.body);
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
        if(err){
            res.redirect("/posts");
        }else{
            res.redirect("/posts/"+req.params.id);
        }
    });
    
});

//DELETE
app.delete("/posts/:id", function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/posts");
        }else{
            res.redirect("/posts");
        }
    });
    
})

/*************************/
    
//tells express to listen for requests (using env variables from cloud9, which decides the IP and port for us)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("BlogApp-server has started, listening on port "+process.env.PORT);
});