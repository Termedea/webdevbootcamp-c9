/** App variables **/
var express             = require("express"),
    app                 = express(),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose"),
    passport            = require("passport"),
    LocalStrategy       = require("passport-local"),
    methodOverride      = require("method-override");
    
/******************************************/
/** Route variables **/
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
/******************************************/    
/** Models import **/
var User = require("./models/user");
/******************************************/
/** Mongo connection **/
mongoose.connect("mongodb://localhost/yelp_camp");
/******************************************/

/** Express and data init **/
app.use(bodyParser.urlencoded({extended: true}));

//tells express to listen in the public folder as well
app.use(express.static(__dirname+"/public"));

//tells express that we use ejs so we dont have to specify it.
app.set("view engine", "ejs");

//use method override for put and delete routes. Looks for the prefix _method in get-requests. 
app.use(methodOverride("_method"));

//only reseeds if set as an argument. 
var seed = process.argv[2];
if(seed === "true"){
    var seedDB = require("./seed");
    //seed database
    seedDB();
}
/******************************************/



/** Passport config **/
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

/******************************************/

/** Middleware **/

//will call this function on every route and pass in user if it exists (is logged in.)
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
/******************************************/

/** Routes **/
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
/******************************************/

/** Start server **/
//tells express to listen for requests (using env variables from cloud9, which decides the IP and port for us)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp-server has started, listening on port "+process.env.PORT);
});
/******************************************/