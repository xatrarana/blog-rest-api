const express = require('express');
const Search = require('../controllers/Search');
const feedController = require('../controllers/feedController');

const feedRoute = express.Router();

feedRoute.get('/',feedController);
// route.post('/create',CreatePost);


module.exports = feedRoute;