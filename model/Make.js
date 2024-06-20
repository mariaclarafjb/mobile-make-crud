const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Make = new Schema({
  name: {
    type: String
  },
  brand: {
    type: String
  },
  color: {
    type: Number
  },
  local: {
    type: String
  }
},{
    collection: 'make'
});

module.exports = mongoose.model('Make', Make);