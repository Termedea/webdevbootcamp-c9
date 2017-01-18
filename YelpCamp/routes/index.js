var express = require("express");
var router = express.Router();
var passport = require("passport");
var tools = require("../tools");

/** MODELS **/
var User = require("../models/user");


/** INDEX ROUTE **/
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
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("register");
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
                req.flash("success", tools.successRegister(user.username));
                console.log("logged in");
            })
        }
    });
});

//LOGIN
router.get("/login", function(req, res) {
   res.render("login");
});

//passport.auth... is middleware. 
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    successReturnToOrRedirect: "/campgrounds"
}));

//LOGOUT
router.get("/logout", function(req, res) {
    req.flash("success", tools.successLogout());
    req.logout();
    res.redirect("/campgrounds");
});
/******************************************/

module.exports = router; 