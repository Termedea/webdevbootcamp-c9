var express = require("express"),
    router = express.Router(),
    expressSanitizer    = require("express-sanitizer");
    
router.use(expressSanitizer());
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

//NEW - Show form for adding new campground
router.get("/new", isLoggedIn, function(req, res){
   res.render("campgrounds/new");
});

//CREATE - Add campground to database
router.post("/", isLoggedIn, function(req, res){
    
    var campground = {
        name: req.body.campground.name, 
        image: req.body.campground.image, 
        description: req.sanitize(req.body.campground.description),
        author: {id: req.user._id, username: req.user.username}
    };
    
    Campground.create(campground, function(err, campground){
       if(err) {
           console.log(err);
       }else{
           res.redirect("/campgrounds");
       }
    });

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

//EDIT - creates form for edit
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
    
    Campground.findById(req.params.id, function(err, campground){
        res.render("campgrounds/edit", {campground: campground});
    });

});

//UPDATE - saves updates
router.put("/:id", checkCampgroundOwnership, function(req, res){
    //TOD: fixa sanitize på update

    //find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            //redirect to uptaded page
            res.redirect("/campgrounds/"+campground._id);
        }
    });
});

// DESTROY - delete campground
router.delete("/:id", checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err)
       }
       res.redirect("/campgrounds");
   });
});

/******************************************/

/** MIDDLEWARE **/
function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated())   
    {
        return next();
    }else{
        req.session.returnTo = req.originalUrl; 
    }
    res.redirect("/login");
}


function checkCampgroundOwnership(req, res, next){
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
}

module.exports = router; 