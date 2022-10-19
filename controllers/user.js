const User = require("../modules/user");
const ObjectId = require("mongodb").ObjectId;

// GET all reminders
const getUsers = async (req, res) => {
  User.find()
    .then((userList) => {
      res.status(200).json(userList);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// GET a reminder depending on the id given
const getUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid client id to find a reminder.");
    }
  
    const userId = req.params.id;
  
    User.find({ _id: userId })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  };

const createUser = async (req, res) => {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
  
    user.save()
  
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  };

module.exports = {
    getUsers,
    getUser,
    createUser
  };