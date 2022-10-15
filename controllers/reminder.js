const Reminder = require("../modules/reminder");
const ObjectId = require("mongodb").ObjectId;

// GET all reminders
const getReminders = async (req, res) => {
  Reminder.find()
    .then((reminderList) => {
      res.status(200).json(reminderList);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// GET a reminder depending on the id given
const getReminder = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid client id to find a reminder.");
  }

  const reminderId = req.params.id;

  Reminder.find({ _id: reminderId })
    .then((reminder) => {
      res.status(200).json(reminder);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// POST REQUEST
const createReminder = async (req, res) => {
  const reminder = new Reminder({
    clientId: req.body.clientId,
    clientUsername: req.body.clientUsername,
    clientPassword: req.body.clientPassword,
    addDate: req.body.addDate,
    phone: req.body.phone,
    email: req.body.email,
    isDone: req.body.isDone,
  });

  reminder.save()

    .then((reminder) => {
      res.status(201).json(reminder);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// PUT REQUEST
const updateReminder = async (req, res) => {
  // validate the mongodb id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid student id to update a student.");
  }

  const reminderId = req.params.id;

  // find the contact to update
  Reminder.findOne({ _id: reminderId }) 
    .then((reminder) => {
      reminder.clientId = req.body.clientId,
      reminder.clientUsername = req.body.clientUsername,
      reminder.clientPassword = req.body.clientPassword,
      reminder.addDate = req.body.addDate,
      reminder.phone = req.body.phone,
      reminder.email = req.body.email,
      reminder.isDone = req.body.isDone,

      Reminder.updateOne({ _id: reminderId }, reminder)
          .then((result) => {
            // 204 if the test was successfully
            res.status(204).json({ message: "Update Done successfull" });
          })
          .catch((error) => {
            res.status(500).json({ error: error });
          });
      })

    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// DELETE REQUEST
const deleteReminder = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid student id to delete a student.");
  }

  const reminderId = req.params.id;

  Reminder.findOne({ _id: reminderId })
    .then((reminder) => {
      reminder
        .deleteOne({ _id: reminderId })
        .then((result) => {
          res.status(200).json({ message: "Student Deleted successfull" });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

module.exports = {
  getReminders,
  getReminder,
  createReminder,
  updateReminder,
  deleteReminder,
};
