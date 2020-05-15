const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'tutor', 'student'],
    default: 'student'
  },
  status: {
    type: Boolean,
    default: true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;