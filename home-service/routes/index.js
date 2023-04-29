const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.use(express.json());

const logger = (message) => console.log(`Todos los datos Services: ${message}`);

router.get("/", async (req, res) => {
  const perros = await fetch("http://perros:4000/api/perros/").then(response => response.json());
  const campeonatos = await fetch("http://campeonatos:3000/api/campeonatos").then(response => response.json());
  const raza = await fetch("http://razas:5000/api/razas").then(response => response.json());
  const datos = [perros, campeonatos, raza]

  const response = {
    datos
  };
  return res.send(response);
});

router.get("/PerroRazaDueno/:RazaDueno", async(req, res)=>{
  const [raza, dueno] = req.params.RazaDueno.split(",");
  let perros = await fetch("http://perros:4000/api/perros/").then(response => response.json());
  perros = perros.json.filter(perro => perro.raza === raza);
  perros = perros.filter(perro => perro.nombre_dueno === dueno);
  const response = {
    perros
  };
  return res.send(response);
});

router.get("/Promedio/:raza", async(req, res) => {
  let perros = await fetch("http://perros:4000/api/perros/").then(response => response.json());
  perros = perros.json.filter(perro => perro.raza === req.params.raza);
  const sumaPeso = perros.reduce((acc, perro) => acc + perro.peso, 0);
  const totalPerros = perros.length;

  const response = {
    "Promedio total del peso de perros": sumaPeso/totalPerros,
    perros
  };
  return res.send(response);
});

router.get("/InfoCampeon/:id", async(req, res) =>{
  let perros = await fetch("http://perros:4000/api/perros/").then(response => response.json());
  let campeonatos = await fetch(`http://campeonatos:3000/api/campeonatos/${req.params.id}`).then(response => response.json());


  const response = {
    campeonatos
  };
  return res.send(response);
})

module.exports = router; 