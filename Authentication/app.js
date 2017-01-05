var express                 = require("express"),
    app                     = express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    User                    = require("./models/user");
    
/* db-setup */
mongoose.connect("mongodb://localhost/auth_demo");

/* app init */ 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//inline requirement of express-session.
//It's called as a function and an object with params are passed in
//secret is used to encode and decode the session.
app.use(require("express-session")({
    secret:             "Yoshi is the best and cutest dog in the world",
    resave:             false,
    saveUninitialized:  false
}));

app.use(passport.initialize());
app.use(passport.session());

//serialize encodes data before putting it into a session
//deserialize reads data from the session and de-encode it
//the User.de/serializeUser()-methods exists thanks to userSchema.plugin(passportLocalMongoose);
//in models/user.js. 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(User.authenticate()));
/******************************************************/
/* routes */
app.get("/", function(req, res){
    res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret");
});

//register routes
app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res){
    
    //we make a new user object without password. User.register hashes the password and saves to database
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            res.render("register");
        }else{
            //passport.authenticate will use the local strategy, serialize user, log the user in 
            //and redirect to "secret"-page (could as well be a profile page)
            passport.authenticate("local")(req, res, function(){
                res.render("secret");
            })
        }
    });
    
});

//login routes
app.get("/login", function(req, res){
    res.render("login");
});

//passport is used in app.post as middleware, and sit between what post and what happens on client. 
//passport takes the username and password from the post. 
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
    
}), function(req, res){
    
});

//logout
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});


//Middleware
//next is the next thing that needs to be called
function isLoggedIn(req, res, next){
    
    //isAuthenticated comes with passport. 
    
    if (req.isAuthenticated()){
        //proceed with code inside the route
        return next();
    }
    
    res.send("Not logged in!!");
    
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started...");
});