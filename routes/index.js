const routes = require('express').Router();

// reminder collection
routes.use('/reminder', require('./reminder'));
routes.use('/user', require('./user'));
routes.use('/message', require('./message'));
routes.use('/client', require('./client'));

// authentification
// routes.use('/', require('./auth'))

module.exports = routes;
