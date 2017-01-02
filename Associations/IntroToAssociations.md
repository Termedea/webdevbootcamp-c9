## Intro to Associations

* Define associations
    *  Relations between data
    *  Refers to the idea of having associated data
*  Discuss one:one, one:many, many:many
    *  one:one; one book has one publisher, one employee has one title
    *  one:many; one user can have many photos, but a photo can not have many uploaders
    *  many:many; students can sign up for multiple courses and each course has multiple students enrolled. 
       A book can have many authors and an author can write many books.

#Embedding data
* User has name, email and posts which is an array with post objects; 
    * {
        title: "Aasdasd",
        email: "asda",
        posts: [{title: "asdads", content: "asdasda"}]
    }

* examples in embed.js

#Referencing data
* Users has a name, email and posts which is an array with id:s refering to post objects. 
* Examples in references.js


#Module.Export
* Cleaning up javascript files. 
* It makes code more modular, so that code wont have to be duplicated. 
* module.exports = [what the file returns]
* 