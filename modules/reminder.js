const mongoose = require("mongoose");

// create a model for each student
const reminderSchema = new mongoose.Schema({
    
        "clientId": {type:String},
        "clientUsername":{type:String,require:true},
        "clientPassword": {type:String,require:true},
        "addDate": {type:String},
        "phone": {type:String},
        "email": {type:String},
        "isDone": {type:Boolean}
      
})

module.exports = mongoose.model('reminder', reminderSchema);
