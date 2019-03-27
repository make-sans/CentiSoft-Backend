const isEmpty = require("./is-empty");
const Validator = require("validator");
const moment = require("moment");

module.exports = function validateProjectFields(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.dueDate = !isEmpty(data.dueDate) ? data.dueDate : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters!";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (!moment(data.dueDate).isValid()) {
    errors.dueDate = "Invalid due date";
  }
  if (Validator.isEmpty(data.dueDate)) {
    errors.dueDate = "Due date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
