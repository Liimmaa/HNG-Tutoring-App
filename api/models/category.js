const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const CategorySchema = new mongoose.Schema({
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
 
});

CategorySchema.plugin(timestamp);

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;