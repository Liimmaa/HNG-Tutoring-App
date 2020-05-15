const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const LessonSchema = new mongoose.Schema({
  sujectID: {
    type: String,
    required: true,
    trim: true
  },
  
 UserID: {
    type: String,
    required: true,
    trim: false
  },
  CatID: {
    type: String,
    required: true,
    trim: false
  },
  groupID:{
    type: String,
    required: true,
    trim: false,
    unique:true
  },
  name:{
    type: String,
    required: true,
    trim: false,
    unique:true
  },
  desc:{
    type: String,
    required: true,
    trim: false,
    unique:true
  }
});

LessonSchema.plugin(timestamp);

const Lesson = mongoose.model('Lesson', LessonSchema);
module.exports = Lesson;