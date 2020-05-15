const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  categoryID: {
    type: String,
    required: true,
    trim: false
  },
 
});

SubjectSchema.plugin(timestamp);

const Subject = mongoose.model('Subject', SubjectSchema);
module.exports = Subject;