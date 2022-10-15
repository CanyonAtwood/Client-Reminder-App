const routes = require('express').Router();

// reminder collection
routes.use('/reminder', require('./reminder'));

// authentification
routes.use('/', require('./auth'))

module.exports = routes;
