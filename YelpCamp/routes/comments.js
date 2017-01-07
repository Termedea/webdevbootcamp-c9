var express = require("express");
var router = express.Router();

/** MODELS **/
var Campground = require("../models/campground");
var Comment = require("../models/comment");

/** COMMENTS ROUTES **/
//NEW
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
});

//CREATE
router.post("/campgrounds/:id/comments/", isLoggedIn, function(req, res){
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
        }
    });
    
    
});


/******************************************/
/** MIDDLEWARE **/
function isLoggedIn(req, res, next){
    if(req.isAuthenticated())   {
        return next();
    }
    res.redirect("/login");
}

module.exports = router; 