//imports
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 
const notesRoute = require('./routes/notes.js')
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/notes', notesRoute);

app.listen(PORT, () => {
    console.log(`server now listening on port ${PORT}!`);
})