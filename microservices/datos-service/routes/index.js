const express = require("express");
const router = express.Router(); 
const fetch = require("node-fetch");
const fs = require('fs');

const path = "./data/datos_perro.json";

router.use(express.json());

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

router.get("/:id", async (req, res) => {
  const reqId = req.params.id.split(",");
  const datos = await fetch(`http://perros:4000/api/perros`).then(resolve => resolve.json());
  const perros = datos.json.filter(perro => reqId.some(p => perro.Id == p));
  const response = {
    "Total de perros": perros.length,
    "El peso maximo entre estos perros": perros.reduce((anterior, actual) => (anterior.peso > actual.peso) ? anterior : actual).peso,
    "El peso minimo entre estos perros": perros.reduce((anterior, actual) => (anterior.peso < actual.peso) ? anterior : actual).peso,
    perros
  };
  return res.send(response);
});

router.get("/razas/:razas", async (req, res) => {
  const reqRazas = req.params.razas.split(",");
  const datos = await fetch(`http://perros:4000/api/perros`).then(resolve => resolve.json());
  const perros = datos.json.filter(perro => reqRazas.some(p => perro.raza == p));
  const response = {
    "Total de perros": perros.length,
    "El peso maximo entre estos perros": perros.reduce((anterior, actual) => (anterior.peso > actual.peso) ? anterior : actual).peso,
    "El peso minimo entre estos perros": perros.reduce((anterior, actual) => (anterior.peso < actual.peso) ? anterior : actual).peso,
    perros
  };
  return res.send(response);
});


module.exports = router; 