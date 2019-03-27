const express = require("express");
const Project = require("../projects/Project");
const Customer = require("../customer/Customer");
const router = express.Router();

const validateProjectFields = require("../validation/project");

//get projects for a customer
router.get("/:custId/projects", (req, res) => {
  Customer.findById(req.params.custId)
    .then(customer => {
      Project.find({ customerId: customer._id })
        .then(projects => res.json(projects))
        .catch(err =>
          res.status(404).json({ projectnotfound: "Project not found by id" })
        );
    })
    .catch(err => {
      res.status(404).json({ success: false });
      console.log(err);
    });
});

router.post("/:custId/projects", (req, res) => {
  // TODO validate json body
  const { errors, isValid } = validateProjectFields(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const project = new Project({
    name: req.body.name,
    dueDate: req.body.dueDate,
    customerId: req.params.custId
  });

  project
    .save()
    .then(project => res.json(project))
    .catch(err => console.log(err));
});

router.get("/:custId/projects/:projectId", (req, res) => {
  Project.findById(req.params.projectId)
    .then(project => {
      if (project.customerId !== req.params.custId)
        return res.status(404).json({ success: false });

      res.json(project);
    })
    .catch(err => {
      res.status(404).json({ success: false });
      console.log(err);
    });
});

router.put("/:custId/projects/:projectId", (req, res) => {
  Project.findById(req.params.projectId)
    .then(project => {
      if (project.customerId !== req.params.custId)
        return res.status(404).json({ success: false });

      project.name = req.body.name || project.name;
      project.dueDate = req.body.dueDate || project.dueDate;
      project.customerId = req.body.customerId || project.customerId;

      project
        .save()
        .then(project => res.json(project))
        .catch(err => {
          res.status(500).end();
          console.log(err);
        });
    })
    .catch(err => {
      res.status(404).json({ success: false });
      console.log(err);
    });
});

router.delete("/:custId/projects/:projectId", (req, res) => {
  Project.findById(req.params.projectId)
    .then(project => {
      if (project.customerId.toString() !== req.params.custId)
        return res.status(404).json({ msg: "Incorrect customer id" });

      project
        .remove()
        .then(() => res.json({ success: true }))
        .catch(err => {
          res.status(404).json({ msg: "Remove failed" });
          console.log(err);
        });
    })
    .catch(err => {
      res.status(404).json({ msg: "Project not found by id" });
      console.log(err);
    });
});

module.exports = router;
