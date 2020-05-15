const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const BookSchema = new mongoose.Schema({
  LessonID: {
    type: String,
    required: true,
    trim: false
  },
  TutorID: {
    type: String,
    required: true,
    trim: false
  },
  UserID: {
    type: String,
    required: true,
    trim: false
  },
 
});

BookSchema.plugin(timestamp);

const Book = mongoose.model('Book', BookSchema);
module.exports = Book;