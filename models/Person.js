const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  nameRu: {
    type: String,
    required: true
  },
  nameOriginal: {
    type: String,
    required: true
  },
  specialty: {
    type: String,
    default: '',
    required: true
  },
  dob: {
    type: Date,
    default: '',
    required: true
  },
  products: {
    ref: "products",
    type:Array
  },
  imageSrc: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('person', personSchema);