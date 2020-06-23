//for what's currently ContactPage.html
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  comment: { type: String, required: true },
  time: { type: Date, default: Date.now() },
});

const feedback = mongoose.model("feedback", feedbackSchema);

module.exports = feedback;