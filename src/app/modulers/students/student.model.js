const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  subjects: {
    type: String,
    required: true,
  },
  student_image:{
    type:String,
    required:true,
  },
  active: {
    type: Boolean,
    default: true,
  },
},


  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        const createdAtDate = new Date(ret.createdAt);
        const updatedAtDate = new Date(ret.updatedAt);
        const formattedDate = `${createdAtDate.getDate()} ${createdAtDate.toLocaleString('default', { month: 'short' })}, ${createdAtDate.getFullYear()}`;
        const formattedUpdatedDate = `${updatedAtDate.getDate()} ${createdAtDate.toLocaleString('default', { month: 'short' })}, ${createdAtDate.getFullYear()}`;
        ret.created_at = formattedDate;
        ret.updated_at = formattedUpdatedDate;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      }
    }
  });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
