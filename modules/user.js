const mongoose = require("mongoose");

// create a model for each student
const userSchema = new mongoose.Schema({
    
        "firstName": {type:String,require:true},
        "lastName":{type:String,require:true},
        "username": {type:String,require:true},
        "password": {type:String,require:true},
        "email": {type:String}
      
})

module.exports = mongoose.model('user', userSchema);