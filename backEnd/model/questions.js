const mongoose = require("mongoose");

const questionsSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  answerOptions: [
    {
      answerText1: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText2: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText3: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
    {
      answerText4: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

module.exports = mongoose.model("questions", questionsSchema);
