const express = require("express");
const router = express.Router(); 
const fetch = require("node-fetch");
const fs = require('fs');

const path = "./data/datos_perro.json";

const logger = (message) => console.log(`Dogs Services: ${message}`);
router.get("/", async(req, res) => {
  await fs.readFile(path, (err, data) => {
    if (err) throw err;    
    const json = JSON.parse(data);    
    const response = {
      json
    };
    return res.send(response);
  });
});



module.exports = router; 