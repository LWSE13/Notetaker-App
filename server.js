//imports
const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); 
const api = require('./routes/index.js')
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//routes
app.use('/api', api);

//html routes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/index.html'))
);
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, './public/notes.html'))
);
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => {
    console.log(`server now listening on port ${PORT}!`);
})