module.exports = {
    errorFetching: function(model){
        return "Could not fetch " +model+", please try again later.";
    },
    errorSaving: function(model){
        return "Could not save " +model+", please try again later."
    },
    errorUpdating: function(model){
        return "Could not update " +model+", please try again later."
    },
    errorDeleting: function(model){
        return "Could not remove "+model+", please try again later."
    },
    errorAuth: function(){
        return "You don't have permission to do that";
    },
    errorNotLoggedIn: function(){
        return "You must be logged in to do that";
    },
    successCreating: function(model){
        return "Successfully created a new "+model;
    },
    successUpdating: function(model){
        return "Successfully updated a "+model;
    },
    successDeleting: function(model){
        return "Successfully deleted a "+model;
    },
    successLogin: function(user){
        return "Successfully logged in, welcome "+user;
    },
    successRegister: function(user){
        return "Successfully registred as "+user+". Welcome to YelpCamp! :)"
    },
    successLogout: function(){
        return "You're now logged out. Welcome back! :)";
    },
}