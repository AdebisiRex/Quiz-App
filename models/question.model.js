const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  question: { type: String, required: true },
  category: String,
  optionA: { type: String, required: true },
  optionB: { type: String, required: true },
  optionC: { type: String, required: true },
  optionD: { type: String, required: true },
  creatorID: { type: String, required: true },
  answer: { type: String, required: true },
});

const questionModel  = mongoose.model("quiz_questions", questionSchema)

module.exports = questionModel;
