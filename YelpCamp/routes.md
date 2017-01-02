## Routes

Route        Path                           Verb    Description                           CRUD    
===============================================================================================
*** Campground ***
INDEX       /camogrounds                    GET     Display a list of all camoground      READ 
NEW         /camogrounds/new                GET     Display Form to make new camoground   CREATE
CREATE      /camogrounds                    POST    Add new camoground to database        CREATE
SHOW        /camogrounds/:id                GET     Shows info on specific camoground     READ



*** Comments ***
Route        Path                           Verb    Description                         CRUD    
===============================================================================================
NEW         /campgrounds/:id/comments/new   GET     Display form for adding a comments  CREATE      
                                                    to specific campground.
CREATE      /campgrounds/:id/comments/new   POST    Create comment for campground.      CREATE


