var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");

var data = [
        {
            name: "Cloud's Rest",
            image: "https://farm4.staticflickr.com/3210/2668353950_b5c25a6830.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in mauris a diam maximus posuere quis vulputate libero. Sed ac vestibulum odio. Maecenas euismod fermentum ante, at ornare ligula condimentum at. Ut iaculis orci a enim mollis euismod. Praesent eros libero, placerat nec ligula non, egestas lacinia nunc. Aliquam vel nisl id lorem facilisis congue non nec mi. Aliquam nec vulputate velit."
        }, 
        {
            name: "Mocca Hills",
            image: "https://farm7.staticflickr.com/6116/6358700415_b7b3901517.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in mauris a diam maximus posuere quis vulputate libero. Sed ac vestibulum odio. Maecenas euismod fermentum ante, at ornare ligula condimentum at. Ut iaculis orci a enim mollis euismod. Praesent eros libero, placerat nec ligula non, egestas lacinia nunc. Aliquam vel nisl id lorem facilisis congue non nec mi. Aliquam nec vulputate velit."
        }, 
        {
            name: "Granite Falls",
            image: "https://farm6.staticflickr.com/5558/14764733077_0244dd35ae.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in mauris a diam maximus posuere quis vulputate libero. Sed ac vestibulum odio. Maecenas euismod fermentum ante, at ornare ligula condimentum at. Ut iaculis orci a enim mollis euismod. Praesent eros libero, placerat nec ligula non, egestas lacinia nunc. Aliquam vel nisl id lorem facilisis congue non nec mi. Aliquam nec vulputate velit."
        }, 
        {
            name: "Salmon Creek",
            image: "https://farm9.staticflickr.com/8577/16263386718_c019b13f77.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in mauris a diam maximus posuere quis vulputate libero. Sed ac vestibulum odio. Maecenas euismod fermentum ante, at ornare ligula condimentum at. Ut iaculis orci a enim mollis euismod. Praesent eros libero, placerat nec ligula non, egestas lacinia nunc. Aliquam vel nisl id lorem facilisis congue non nec mi. Aliquam nec vulputate velit."
        } 
        
    ];

function seedDB(){
    
    //remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Database cleaned: Campgrounds removed");
            
            //add a few camgounds
           data.forEach(function(seed){
               Campground.create(seed, function(err, campground){
                   if(err){
                       console.log();
                   }else{
                       console.log("Added campground");
                      
                      //add a few comments
                      Comment.create(
                          {
                              text: "This place is great, but I wish there were wifi",
                              author: {username: "Homer"}
                              
                          }, function(err, comment){
                              if(err){
                                  console.log(err);
                              }else{
                                  campground.comments.push(comment);
                                  campground.save();
                                  console.log("Created new comment");
                                  
                              }
                          });
                   }
               }) 
            });
            
        }
    });
    
    
}

module.exports = seedDB;