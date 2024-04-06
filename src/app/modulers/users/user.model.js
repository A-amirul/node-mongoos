const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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


const User = mongoose.model('User', userSchema);

module.exports = User;
