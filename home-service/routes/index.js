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
  let arregloDuenos = perros.map(perro => perro.nombre_dueno);
  arregloDuenos = arregloDuenos.map(a => a !== null)
  const response = {
    arregloDuenos
  };
  return res.send(response);
})


module.exports = router; 