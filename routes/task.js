const express = require("express");
const Task = require("../task/Task");
const Project = require("../projects/Project");
const Developer = require("../developers/Developer");
const router = express.Router();

//validation
const validateTaskFields = require("../validation/task");

//get all tasks for a project
router.get("/:id/tasks", (req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      Task.find({ projectId: project._id })
        .then(task => {
          res.json(task);
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.status(404).json({ projectnotfound: "No project found with the id" });
    });
});

//get a task for a project by id
router.get("/:proj_id/tasks/:task_id", (req, res) => {
  Task.findById(req.params.task_id)
    .then(task => {
      if (task.projectId !== req.params.proj_id) {
        return res
          .status(404)
          .json({ noprojectfound: "No project found with that id" });
      }
      res.json(task);
    })
    .catch(err => {
      res.status(404).json({ notaskfound: "No task found with that id" });
    });
});

//create a task
router.post("/:proj_id/tasks", (req, res) => {
  const { errors, isValid } = validateTaskFields(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(req.params.proj_id);
  console.log(typeof req.params.proj_id);

  Project.findById(req.params.proj_id)
    .then(project => {
      Developer.findById(req.body.developerId.toString())
        .then(developer => {
          const newTask = new Task({
            name: req.body.name,
            description: req.body.description,
            created: req.body.created,
            duration: req.body.duration,
            projectId: project._id,
            developerId: developer._id
          });

          newTask.save().then(task => res.json(task));
        })
        .catch(err => {
          return res
            .status(404)
            .json({ developernotfound: "No developer found with that id" });
        });
    })
    .catch(err => {
      console.log(err);

      return res
        .status(404)
        .json({ projectnotfound: "No project found with that id" });
    });
});
//delete a task
router.delete("/:proj_id/tasks/:task_id", (req, res) => {
  Task.findById(req.params.task_id)
    .then(task => {
      if (task.projectId.toString() !== req.params.proj_id)
        return res
          .status(404)
          .json({ msg: "Projectid does not equal params project id" });

      task
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err => {
          res.status(404).json({ msg: "Delete failed" });
          console.log(err);
        });
    })
    .catch(err => {
      res.status(404).json({ tasknotfound: "Task not found with that id" });
    });
});

router.put('/:proj_id/tasks/:task_id', (req, res) => {
  Task.findById(req.params.task_id)
    .then(task => {
      if (task.projectId.toString() !== req.params.proj_id)
        return res.status(404).json({ success: false })
      
      task.name = req.body.name || task.name;
      task.description = req.body.description || task.description;
      task.created = req.body.created || task.created;
      task.duration = req.body.duration || task.duration;
      task.projectId = req.body.projectId || task.projectId;
      task.developerId = req.body.developerId || task.developerId;

      task.save()
        .then(task => {
          res.json(task)
        })
        .catch(err => {
          res.status(500).json({ success: false })
          console.log(err)
        })

    })
    .catch(err => {
      res.status(404).json({ tasknotfound: "Task not found with that id" })
      console.log(err)
    })
})

module.exports = router;
