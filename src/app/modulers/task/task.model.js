// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  student: {
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
    required: false,
  },
  image: {
    type: String, 
    required: false,
  }


  
},{
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
