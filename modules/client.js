const mongoose = require("mongoose");

// create a model for each student
const clientSchema = new mongoose.Schema({
        "clientUsername": {type:String, require: true},
        "clientPassword":{type:String, require: true},
        "birthday": {type:String},
        "email": {type:String},
        "phoneNumber": {type: Number},
})

module.exports = mongoose.model('client', clientSchema);
