var express             = require("express"),
    router              = express.Router(),
    expressSanitizer    = require("express-sanitizer"),
    middleware          = require("../middleware"),
    tools               = require ("../tools");
    
router.use(expressSanitizer());
/** MODELS **/
var Campground = require("../models/campground");


/** CAMPGROUND ROUTES **/

//INDEX - Show all campgrounds
router.get("/", function(req, res){
    
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log("APA!!!");
            console.log(err);
        }else{
            //req.user contains all user information. 
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

//NEW - Show form for adding new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new");
});

//CREATE - Add campground to database
router.post("/", middleware.isLoggedIn, function(req, res){
    
    var campground = {
        name: req.body.campground.name, 
        price: req.body.campground.price,
        image: req.body.campground.image, 
        description: req.sanitize(req.body.campground.description),
        author: {id: req.user._id, username: req.user.username}
    };
    
    Campground.create(campground, function(err, campground){
       if(err) {
           req.flash("error", tools.errorSaving("campground"));
           console.log(err);
       }else{
           req.flash("success", tools.successCreating("campground"));
           res.redirect("/campgrounds");
       }
    });

});


//SHOW - show info on specific campground
router.get("/:id", function(req, res) {
    //find campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        
        if(err){
            req.flash("error", tools.errorFetching("campground"));
            console.log(err);
        }else{
            //render show-template with that id. 
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//EDIT - creates form for edit
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", tools.errorFetching("campground"));
            console.log(err);
        }
        res.render("campgrounds/edit", {campground: campground});
    });

});

//UPDATE - saves updates
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //TODO: fixa sanitize på update

    //find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
        if(err){
            req.flash("error", tools.errorUpdating("campground"));
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            //redirect to uptaded page
            req.flash("success", tools.successUpdating("campground"));
            res.redirect("/campgrounds/"+campground._id);
        }
    });
});

// DESTROY - delete campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash("error", tools.errorDeleting("campground"));
           console.log(err)
       }
       req.flash("success", tools.successDeleting("campground"));
       res.redirect("/campgrounds");
   });
});

/******************************************/


module.exports = router; 