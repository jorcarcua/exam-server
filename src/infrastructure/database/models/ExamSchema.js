const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExamSchema = new Schema({
  title: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  numberQuestions: { type: Number, default: 0 },
  success: { type: Number, default: 0 },
  failure: { type: Number, default: 0 },
});

module.exports = mongoose.model('Exam', ExamSchema);
