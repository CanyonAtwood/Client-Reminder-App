const Message = require("../modules/message");
// const ObjectId = require("mongodb").ObjectId;

// GET all reminders
const getMessages = async (req, res) => {
  Message.find()
    .then((messageList) => {
      res.status(200).json(messageList);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

module.exports = {
    getMessages,
  };

