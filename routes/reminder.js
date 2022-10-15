
const routes = require("express").Router();
const controller = require('../controllers/reminder');

// GET all students
routes.get('/', controller.getReminders)

// GET specific student
routes.get('/:id', controller.getReminder)

// POST student
routes.post('/', controller.createReminder)

// PUT student
routes.put('/:id', controller.updateReminder)

// DELETE student
routes.delete('/:id', controller.deleteReminder)

module.exports = routes;