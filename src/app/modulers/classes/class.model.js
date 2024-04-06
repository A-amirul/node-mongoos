// models/class.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  }
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
