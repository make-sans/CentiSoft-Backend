const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const CustomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  address2: {
    type: String
  },
  zip: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  }
});
module.exports = Customer = mongoose.model("customer", CustomerSchema);
