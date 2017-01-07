var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    seedDB              = require("./seed"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local");

/* Mongo connection */
mongoose.connect("mongodb://localhost/yelp_camp");
/******************************************/

/* Express and data init */
app.use(bodyParser.urlencoded({extended: true}));

//tells express to listen in the public folder as well
app.use(express.static(__dirname+"/public"));

//tells express that we use ejs so we dont have to specify it.
app.set("view engine", "ejs");

//only reseeds if set as an argument. 
var seed = process.argv[2];
if(seed === "true"){
    //seed database
    seedDB();
}
/******************************************/

/* Models import */
var Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user");


//passport and session config
app.use(require("express-session")({
    secret: "I love Yoshi",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//will call this function on every route and pass in user if it exists (is logged in.)
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

/** CAMPGROUND ROUTES **/
app.get("/", function(req, res){
    res.render("landing");
});


//INDEX - Show all campgrounds
app.get("/campgrounds", function(req, res){
    
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }else{
            //req.user contains all user information. 
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

//CREATE - Add campground to database
app.post("/campgrounds", function(req, res){
    
    Campground.create(
    req.body.campground, function(err, newCampground){
       if(err) {
           console.log(err);
       }else{
           res.redirect("/campgrounds");
       }
    });

});

//NEW - Show form for adding new campground
app.get("/campgrounds/new", function(req, res){
   res.render("campgrounds/new");
});

//SHOW - show info on specific campground
app.get("/campgrounds/:id", function(req, res) {
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        
        if(err){
            console.log(err);
        }else{
            //render show-template with that id. 
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

/******************************************/

/** COMMENTS ROUTES **/
//NEW
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
});

//CREATE
app.post("/campgrounds/:id/comments/", isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("campgrounds/")
        }else{
            
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   campground.comments.push(comment);
                   campground.save(function(err, campground){
                       if(err){
                           console.log(err)
                       }else{
                            res.redirect("/campgrounds/"+campground._id+"/");        
                       }
                   });
                   
               }
            });
            
            //connect new comment to campground
            
            //redirect to campground showpage
        }
    });
    
    
});

/******************************************/


/** AUTH ROUTES **/

//REGISTER 
app.get("/register", function(req, res) {
   res.render("register");
});

app.post("/register", function(req, res) {
    
    //fetching username and password. Username is stored inside a User-object, password is to be sent in seperately.
    var newUser = new User({username: req.body.username});
    var newPassword = req.body.password; 
    
    User.register(newUser, newPassword, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
                console.log("logged in");
            })
        }
    });
});

//LOGIN
app.get("/login", function(req, res) {
   res.render("login");
});

//passport.... is middleware. 
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));


//LOGOUT
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});
/******************************************/

/** MIDDLEWARE **/
function isLoggedIn(req, res, next){
    if(req.isAuthenticated())   {
        return next();
    }
    res.redirect("/login");
}

/******************************************/
//tells express to listen for requests (using env variables from cloud9, which decides the IP and port for us)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp-server has started, listening on port "+process.env.PORT);
});