const routes = require("express").Router();
const controller = require('../controllers/client');

// GET all students
routes.get('/', controller.getClients)

module.exports = routes;