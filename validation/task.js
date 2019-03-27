const isEmpty = require("./is-empty");
const Validator = require("validator");
const moment = require("moment");

module.exports = function validateTaskFields(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.created = !isEmpty(data.created) ? data.created : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";
  data.developerId = !isEmpty(data.developerId) ? data.developerId : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters!";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }
  if (!moment(data.created).isValid()) {
    errors.created = "Invalid created date";
  }
  if (Validator.isEmpty(data.created)) {
    errors.created = "Created field is required";
  }
  if (Validator.isEmpty(data.duration)) {
    errors.duration = "Duration field is required";
  }
  if (Validator.isEmpty(data.developerId)) {
    errors.developerId = "Developer field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
