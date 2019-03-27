const express = require("express");
const Project = require("../projects/Project");
const router = express.Router();

//get projects for a customer
router.get("/:id/projects", (req, res) => {
  Project.find({ customerId: req.params.id })
    .then(projects => res.json(projects))
    .catch(err =>
      res.status(404).json({ projectnotfoun: "Project not found by id" })
    );
});

module.exports = router;
