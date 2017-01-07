var express = require("express");
var router = express.Router();

/** MODELS **/
var Campground = require("../models/campground");

/** CAMPGROUND ROUTES **/

//INDEX - Show all campgrounds
router.get("/", function(req, res){
    
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
router.post("/", function(req, res){
    
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
router.get("/new", function(req, res){
   res.render("campgrounds/new");
});

//SHOW - show info on specific campground
router.get("/:id", function(req, res) {
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

module.exports = router; 