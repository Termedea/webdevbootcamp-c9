var mongoose = require("mongoose"),
    Post = require("./models/posts"),
    User = require("./models/users");

mongoose.connect("mongodb://localhost/blog_demo_2");

/*User.create({
    email: "bob@gmail.com",
    name: "Bob Belcher"
});
*/

/*Post.create({
    title: "How to cook the best burger part 4",
    content: "New jibberish"
}, function(err, post){
    User.findOne({email: "bob@gmail.com"}, function(err, user){
        if(err){
            console.log(err);
        }else{
            user.posts.push(post);
            user.save(function(err, data){
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                }
                
            });
        }
        
    })
});*/

//find user and find all posts for user

User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user){
   if(err) {
       console.log(err);
   }else{
       console.log(user);
   }
});