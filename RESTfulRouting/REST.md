#RESTful Routes
* What is REST?
    * Representational State Transfer
    * A pattern for mapping between HTTP routes and CRUD
* Why RESTful Routing?
    * Good for structure
    * It's conventional and relialble pattern

Routes
Route   Path            Verb    Description                     CRUD    
=======================================================================
INDEX   /dogs           GET     Display a list of all dogs      READ 
NEW     /dogs/new       GET     Display Form to make new dog    CREATE
CREATE  /dogs           POST    Add new dog to database         CREATE
SHOW    /dogs/:id       GET     Shows info on specific dog      READ

EDIT    /dogs/:id/edit  GET     Show edit-form for one dog      UPDATE
UPDATE  /dogs/:id       PUT     Update particular dog           UPDATE
DELETE  /dogs/:id       DELETE  Delete a particular dog         DELETE


