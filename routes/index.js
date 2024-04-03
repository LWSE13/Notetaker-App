const express = require('express');
const notesRoute = require('./notes.js')
const router = express.Router();
router.use('/notes', notesRoute);
module.exports = router;