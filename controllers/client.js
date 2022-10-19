const Client = require("../modules/client");
// const ObjectId = require("mongodb").ObjectId;

// GET all reminders
const getClients = async (req, res) => {
  Client.find()
    .then((clientList) => {
      res.status(200).json(clientList);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

module.exports = {
    getClients,
  };
