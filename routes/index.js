const express = require("express");

// Import custom middleware
const { clog } = require("../middleware/clog");

// Import our modular routers for /tips and /feedback
//onst tipsRouter = require("./tips");
//const feedbackRouter = require("./feedback");
const notesRouter = require("./notes");

const app = express();

//app.use("/tips", tipsRouter);
//app.use("/feedback", feedbackRouter);
app.use("/notes", notesRouter);

// Initialize custom middleware
app.use(clog);

module.exports = app;
