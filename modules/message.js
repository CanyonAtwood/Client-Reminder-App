const mongoose = require("mongoose");

// create a model for each student
const messageSchema = new mongoose.Schema({
        "message": {type:String},
        "callbackNumber":{type:String},
        "officeAdress": {type:String},
        "websiteLink": {type:String},
})

module.exports = mongoose.model('message', messageSchema);
