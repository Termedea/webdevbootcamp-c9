var express = require("express");
var router = express.Router();
var passport = require("passport");

/* Models import */
var User = require("../models/user");


//INDEX
router.get("/", function(req, res){
    res.render("landing");
});


/** AUTH ROUTES **/

//REGISTER 
router.get("/register", function(req, res) {
   res.render("register");
});

router.post("/register", function(req, res) {
    
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
router.get("/login", function(req, res) {
   res.render("login");
});

//passport.... is middleware. 
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));


//LOGOUT
router.get("/logout", function(req, res) {
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
