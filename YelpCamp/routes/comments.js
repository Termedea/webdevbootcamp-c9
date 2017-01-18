var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    middleware  = require("../middleware"),
    tools       = require("../tools");

/** MODELS **/
var Campground = require("../models/campground");
var Comment = require("../models/comment");

/** COMMENTS ROUTES **/
//NEW - form for adding
router.get("/new", middleware.isLoggedIn, function(req, res){
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", tools.errorFetching("comment"));
            console.log(err);
        }else{
            res.render("comments/new", {campground: campground});
        }
    })
});

//CREATE - saving the new comment
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", tools.errorFetching("comment"));
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
                   req.flash("error", tools.errorSaving("comment"));
                   console.log(err);
               }else{
                   //if comment saved successfully, add comment to campground
                   campground.comments.push(comment);
                   //save campground
                   campground.save(function(err, campground){
                       if(err){
                           req.flash("error", tools.errorSaving("comment"));
                           console.log(err)
                       }else{
                            req.flash("success", tools.successCreating("comment"));
                            res.redirect("/campgrounds/"+campground._id+"/");        
                       }//if no errors on campground save
                   });//campground save
                   
               }//if no errors on comment save
            });//comment save
        }//if no errors on campground find
    });//campground find
    
    
});

//EDIT - show the edit form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            req.flash("error", tools.errorFetching("comment"));
            console.log(err);
            res.redirect("back");
        }else {
            res.render("comments/edit", {campground_id: req.params.id, comment: comment});
        }
    });
});

//UPDATE - save the changed comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            req.flash("error", tools.errorUpdating("comment"));
            console.log(err);
            res.redirect("back")
        }else{
            req.flash("success", tools.succesUpdating("comment"));
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//DESTROY - delete a comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){

   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           req.flash("error", tools.errorRemoving("comment"));
           console.log(err)
       }else{
            req.flash("success", tools.successDeleting("comment"));
            res.redirect("/campgrounds/"+req.params.id);
       }
   });
});

/******************************************/

module.exports = router; 