const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: '',
    required: true
  },
  year: {
    type: Date,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: '',
    required: true
  },
  trailerSrc: {
    type: String,
    default: ''
  },
  imageSrc: {
    type: String,
    default: ''
  },
  nameOriginal: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  genre: {
    ref: "genre",
    type: String
  },
  person: {
    ref: "person",
    //type:Schema.Types.ObjectId
    type:Array
  },
  director: {
    ref: "person",
    type:Schema.Types.ObjectId
  },
});

module.exports = mongoose.model('products', productSchema);
