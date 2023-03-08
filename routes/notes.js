const express = require("express");
const notesRouter = express.Router();
const Joi = require("joi");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

// GET Route for retrieving all the notes
notesRouter.get("/", (req, res) => {
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)));
});

notesRouter.get("/:id", (req, res) => {
  readFromFile("./db/notes.json").then((response) => {
    const notes = JSON.parse(response);
    const note = notes.find((c) => c.id === req.params.id);
    if (!note)
      return res.status(404).send("the note with the given ID was not found");
    res.send(note);
  });
});

notesRouter.post("/", (req, res) => {
  //const { error } = validateNote(req.body);
  let error = false; //TODO: validation
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNotes = {
      id: uuid(),
      title,
      text,
    };

    readAndAppend(newNotes, "./db/notes.json");

    const response = {
      status: "success",
      body: newNotes,
    };

    res.json(response);
  } else {
    res.json("Error in posting feedback");
  }
});

notesRouter.put("/:id", (req, res) => {
  readFromFile("./db/notes.json").then((response) => {
    const data = JSON.parse(response);
    const note = data.find((note) => note.id === req.params.id);
    const index = data.findIndex((note) => note.id === req.params.id);

    //validation
    // if (!note)
    //   return res.status(404).send("the note with the given ID was not found");
    // const { error } = validateNote(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const { title, text } = req.body;
    note.title = title;
    note.text = text;
    let updatedNotes = [...data];
    updatedNotes[index] = note;
    writeToFile("./db/notes.json", updatedNotes);
    res.send(note);
  });
});

notesRouter.delete("/:id", (req, res) => {
  readFromFile("./db/notes.json").then((response) => {
    const data = JSON.parse(response);
    const note = data.find((note) => note.id === req.params.id);
    const index = data.findIndex((note) => note.id === req.params.id);
    let updatedNotes = [...data];
    updatedNotes.splice(index, 1);
    //const updatedNotes = data.filter((note) => note.id !== req.params.id);
    writeToFile("./db/notes.json", updatedNotes);
    res.send(note);
  });
});

function validateNote(note) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
  });
  return schema.validate(note);
}

module.exports = notesRouter;
