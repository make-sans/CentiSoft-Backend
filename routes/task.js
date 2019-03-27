const express = require("express");
const Task = require("../task/Task");
const router = express.Router();

//get all tasks
router.get("/", (req, res) => {
  Task.find()
    .then(tasks => {
      res.json(tasks);
    })
    .catch(err => console.log(err));
});

module.exports = router;
