const notesROUTE = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

// GET Routes
notesROUTE.get('/', async (req, res) => {
  console.info(`notes ${req.method} request received`);
  try {
    const data = await readFromFile('./db/db.json');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).json('Error reading file');
  }
});

notesROUTE.get('/:note_id', async (req, res) => {
  const note_id = req.params.note_id;
  console.info(`notes ${req.method}  for id ${note_id} request received`);
  try {
    const data = await readFromFile('./db/db.json');
    const json = JSON.parse(data);
    const result = json.filter((note) => note.note_id === note_id);
    return result.length > 0
      ? res.json(result)
      : res.json('No note found');
  } catch (err) {
    console.error(err);
    res.status(500).json('Error reading file');
  }
});

// POST Route 
notesROUTE.post('/', async (req, res) => {
  console.info(`notes ${req.method} request received`);

  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    try {
      await readAndAppend(newNote, './db/db.json');
      res.json('Note added');
    } catch (err) {
      console.error(err);
      res.status(500).json('Error in adding note');
    }
  } else {
    res.status(400).json('Error: title and text are required');
  }
});

// DELETE Route
notesROUTE.delete('/:note_id', async (req, res) => {
  const note_id = req.params.note_id;
  console.info(`notes ${req.method} for id ${note_id} request received`);

  try {
    const data = await readFromFile('./db/db.json');
    const json = JSON.parse(data);
    // filter out the new note
    const result = json.filter((note) => note.note_id !== note_id);

    writeToFile('./db/db.json', result);

    res.json('Note deleted');
  } catch (err) {
    console.error(err);
    res.status(500).json('Error in deleting note');
  }
});

module.exports = notesROUTE;