const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArraySchema = new Schema({
  text: String,
  correct: Boolean,
});

const QuestionSchema = new Schema({
  exam: Schema.Types.ObjectId,
  text: String,
  success: Number,
  failure: Number,
  answers: [ArraySchema],
});

module.exports = mongoose.model('Question', QuestionSchema);
