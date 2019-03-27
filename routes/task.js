const express = require("express");
const Task = require("../task/Task");
const Project = require("../projects/Project");
const router = express.Router();

//get all tasks for a project
router.get("/:id/tasks", (req, res) => {
  Task.find({ projectId: req.params.id })
    .then(task => {
      res.json(task);
    })
    .catch(err => console.log(err));
});

//get a task for a project by id
router.get("/:proj_id/tasks/:task_id", (req, res) => {
  Task.find({ projectId: req.params.proj_id })
    .then(tasks => {
      res.json(tasks.filter(item => item._id === req.params.task_id));
    })
    .catch(err => console.log(err));
});
module.exports = router;
