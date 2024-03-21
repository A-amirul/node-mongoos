// models/class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  roll_no: {
    type: number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
},{
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
