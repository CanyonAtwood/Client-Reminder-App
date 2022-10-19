const routes = require('express').Router();

// reminder collection
routes.use('/reminder', require('./reminder'));
routes.use('/user', require('./user'));

// authentification
// routes.use('/', require('./auth'))

module.exports = routes;
