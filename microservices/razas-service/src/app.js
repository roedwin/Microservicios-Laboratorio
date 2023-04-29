const express = require("express");

const routes = require("../routes");

const app = express();


app.use("/api/razas", routes);


module.exports = app;
