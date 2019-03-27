const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  },
  duration: {
    type: String
  },
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "project"
  },
  developerId: {
    type: Schema.Types.ObjectId,
    ref: "developer"
  }
});
module.exports = Task = mongoose.model("task", TaskSchema);
