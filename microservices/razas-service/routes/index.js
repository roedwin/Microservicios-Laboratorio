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


module.exports = router;
