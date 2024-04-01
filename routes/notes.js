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

