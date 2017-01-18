//All the middleware goes here.
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    tools       = require("../tools");

module.exports = {
    checkCampgroundOwnership: function (req, res, next){
         //is anyone logged in, if not, redirect.
        if(req.isAuthenticated()){
            //if user is logged in, does user own the campground?
            Campground.findById(req.params.id, function(err, campground){
                if(err){
                    req.flash("error", tools.errorFetching("campground"));
                    console.log("Error retrieving campground");
                    res.redirect("back");
                }else{
                    if(campground.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", tools.errorAuth());
                        console.log("Not authorized");
                        res.redirect("back");
                    }
                }
            });
        }else{
            req.flash("error", tools.errorNotLoggedIn());
            console.log("Not logged in");
            res.redirect("back");
        }
    },
    checkCommentOwnership: function (req, res, next){
         //is anyone logged in, if not, redirect.
        if(req.isAuthenticated()){
            //if user is logged in, does user own the comment?
            Comment.findById(req.params.comment_id, function(err, comment){
                if(err){
                    req.flash("error", tools.errorFetching(comment));
                    res.redirect("back");
                }else{
                    if(comment.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error", tools.errorAuth());
                        res.redirect("back");
                    }
                }
            });
        }else{
            req.flash("error", tools.errorNotLoggedIn());
            console.log("Not logged in");
            res.redirect("back");
        }
    },
    isLoggedIn: function (req, res, next){
        
        if(req.isAuthenticated())   
        {
            return next();
        }else{
            req.session.returnTo = req.originalUrl; 
        }
        req.flash("error", tools.errorNotLoggedIn());
        res.redirect("/login");
    }
};