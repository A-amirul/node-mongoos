// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  document: {
    type: String,
  },
  image: {
    type: String,
  }

}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
