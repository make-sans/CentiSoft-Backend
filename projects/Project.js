const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },

  dueDate: {
    type: Date,
    required: true
  },

  customerId: {
    type: Schema.Types.ObjectId,
    ref: "customer"
  }
});
module.exports = Project = mongoose.model("project", ProjectSchema);
