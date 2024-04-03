const express = require('express');
const notesRoute = require('./notes.js')
const app = express.Router();
app.use ('/notes', notesRoute);
module.exports = app;