var express = require("express");
var router = express.Router({mergeParams: true});

/** MODELS **/
var Campground = require("../models/campground");
var Comment = require("../models/comment");

/** COMMENTS ROUTES **/
//NEW
router.get("/new", isLoggedIn, function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
});

//CREATE
router.post("/", isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("campgrounds/")
        }else{
            
            //create new comment 
            //with comment data from form
            var comment = new Comment(req.body.comment);
            //and author user data from session
            comment.author = {id: req.user._id, username: req.user.username}
            
            //save comment
            comment.save(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               }else{
                   //if comment saved successfully, add comment to campground
                   campground.comments.push(comment);
                   //save campground
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

//EDIT - show the edit form
router.get("/:comment_id/edit", function(req, res){
    
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err);
            res.redirect("back");
        }else {
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});
        }
    });
});

//UPDATE - save the changed comment
router.put("/:comment_id/", function(req, res){
    
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            console.log(err);
            res.redirect("back")
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
})

/******************************************/

/** MIDDLEWARE **/
function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated())   
    {
        return next();
    }
    res.redirect("/login");
}

module.exports = router; 