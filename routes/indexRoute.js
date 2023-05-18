const express = require('express');
const Search = require('../controllers/Search');

const route = express.Router();

route.get('/search',Search);
// route.post('/create',CreatePost);


module.exports = route;