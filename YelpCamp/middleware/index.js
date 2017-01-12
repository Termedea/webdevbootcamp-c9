//All the middleware goes here.
var Campground  = require("../models/campground"),
    Comment     = require("../models/comment")

module.exports = {
    checkCampgroundOwnership: function (req, res, next){
         //is anyone logged in, if not, redirect.
        if(req.isAuthenticated()){
            //if user is logged in, does user own the campground?
            Campground.findById(req.params.id, function(err, campground){
                if(err){
                    console.log("Not authorized");
                    res.redirect("back");
                }else{
                    if(campground.author.id.equals(req.user._id)){
                        next();
                    }else{
                        console.log("Not authorized");
                        res.redirect("back");
                    }
                }
            });
        }else{
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
                    console.log("Not authorized");
                    res.redirect("back");
                }else{
                    if(comment.author.id.equals(req.user._id)){
                        next();
                    }else{
                        console.log("Not authorized");
                        res.redirect("back");
                    }
                }
            });
        }else{
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
        res.redirect("/login");
    }
};