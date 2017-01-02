## Mongo Basics

* Use creates and swiches to the database
* Tables are called collections
* C Insert both creates collection and inserts data
* R Find selects data, no params = all, object with data passes along where-conditions. 
* U Update takes an object with search params first, then an object with new data. needs to be {$set:{key: value}}, to not overwrite the entire object. 
* D Remove takes an object with search params