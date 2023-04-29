// Importamos la biblioteca Express
const express = require("express");
const fetch = require("node-fetch");
const csv = require('csv-parser');
const fs = require('fs');

const data = "./data/raza_info.csv";

const router = express.Router();

const logger = (message) => console.log(`Razas Service: ${message}`);

router.get("/", async (req, res) => {
  const razas = [];
  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (data) => razas.push(data))
    .on('end', () => {
      
      const response = {
        razas
      }
      res.send(response)
    });
});

router.get("/raza/:razas", async(req, res) => {
  const reqRazas = req.params.razas.split(",");
  const razas = await fetch("http://razas:5000/api/razas/").then(response => response.json());

  const raza = razas.razas.filter(raza => reqRazas.some(r => raza.raza.includes(r)));
  const response = {
    raza
  }
  res.send(response);
})

router.get("/acreditado/:acreditado", async(req, res) => {
  const reqAcreditado = req.params.acreditado;
  const razas = await fetch("http://razas:5000/api/razas/").then(response => response.json());

  const raza = razas.razas.filter(raza => raza.acreditado === reqAcreditado);
  const response = {
    raza
  }
  res.send(response);
})


module.exports = router;
