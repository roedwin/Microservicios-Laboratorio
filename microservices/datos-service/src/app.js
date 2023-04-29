// Importa el módulo express
const express = require("express");

const dogs = require("../routes/");

const app = express();

app.use("/api/perros", dogs);

module.exports = app;

