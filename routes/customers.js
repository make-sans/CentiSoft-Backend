const express = require("express");
const Customer = require("../customer/Customer");
const router = express.Router();

//import validation
const validateCustomerFields = require("../validation/customer");

//get all tasks
router.get("/", (req, res) => {
  Customer.find()
    .then(customers => {
      res.json(customers);
    })
    .catch(err => console.log(err));
});

//post a new customer
router.post("/", (req, res) => {
  const { errors, isValid } = validateCustomerFields(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  let customerFields = {};
  if (req.body.name) customerFields.name = req.body.name;
  if (req.body.address) customerFields.address = req.body.address;
  if (req.body.address2) customerFields.address2 = req.body.address2;
  if (req.body.zip) customerFields.zip = req.body.zip;
  if (req.body.city) customerFields.city = req.body.city;
  if (req.body.country) customerFields.country = req.body.country;
  if (req.body.email) customerFields.email = req.body.email;
  if (req.body.phone) customerFields.phone = req.body.phone;

  new Customer(customerFields).save().then(customer => res.json(customer));
});

module.exports = router;
