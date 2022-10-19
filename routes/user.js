const routes = require("express").Router();
const controller = require('../controllers/user');

// GET all students
routes.get('/', controller.getUser);

// GET specific student
routes.get('/:id', controller.getUser);

// POST student
routes.post('/', controller.createUser);

// // PUT student
// routes.put('/:id', controller.updateReminder)

// // DELETE student
// routes.delete('/:id', controller.deleteReminder)

module.exports = routes;
