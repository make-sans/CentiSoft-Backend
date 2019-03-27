var express = require("express");
var path = require("path");
var logger = require("morgan");
const mongoose = require("mongoose");

let developersRouter = require("./routes/developers");
let taskRoute = require("./routes/task");
let projectsRoute = require("./routes/projects");
let customersRoute = require("./routes/customers");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDb connected"))
  .catch(err => console.log(err));

app.use("/api/developers", developersRouter);
app.use("/api/task", taskRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/customers", customersRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
