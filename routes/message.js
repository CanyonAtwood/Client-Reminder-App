const routes = require("express").Router();
const controller = require('../controllers/message');

// GET all students
routes.get('/', controller.getMessages)

module.exports = routes;
