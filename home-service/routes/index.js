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
  const campeonato = await fetch(`http://campeonatos:3000/api/campeonatos/${req.params.id}`).then(response => response.json());
  const idCampeon = campeonato.campeonatos.id_campeon;
  const perro = await fetch(`http://perros:4000/api/perros/${idCampeon}`).then(response => response.json());
  const response = {
    campeonato,
    perro
  };
  return res.send(response);
});

router.get("/acreditado/:acreditado", async(req, res) => {
  const razas = await fetch(`http://razas:5000/api/razas/acreditado/${req.params.acreditado}`).then(response => response.json());
  const razasAcreditadas = razas.raza.map(r => r.raza);

  const perros = await fetch(`http://perros:4000/api/perros/razas/${razasAcreditadas.join(",")}`).then(response => response.json());
  const perrosPremiados = perros.perros.map(perro => perro.Id);

  const campeonatos = await fetch(`http://campeonatos:3000/api/campeonatos/idCampeon/${perrosPremiados.join(",")}`).then(response => response.json());


  const response = {
    "tipo de acreditacion": req.params.acreditado,
    razas,
    campeonatos
  };
  return res.send(response);
})

router.get("/peso/", async(req, res)=>{
  let arr;
  let perros = await fetch("http://perros:4000/api/perros/").then(response => response.json());
  arr = perros.json.map(p => p.peso);
  arr.sort((function (a, b){
    return b-a;
  }));
  let arr2 = []
  for (let i = 0; i < 10; i++) {
    arr2.push(arr[i])
  }
  perros = perros.json.filter(perro => arr2.some(p => perro.peso == p));
  const razasPerros = perros.map(p => p.raza);
  const idsPerro = perros.map(p => p.Id);

  const raza = await fetch(`http://razas:5000/api/razas/raza/${razasPerros.join(",")}`).then(response => response.json());

  const campeonatos = await fetch(`http://campeonatos:3000/api/campeonatos/idCampeon/${idsPerro.join(",")}`).then(response => response.json());

  const puntajes = campeonatos.campeonatos.map(c => {
    return{
      Puntajes: c.puntaje,
      Categorias: c.categoria_ganada
    }
  }).sort();

  const response = {
    raza,
    puntajes
  };
  return res.send(response);
})

module.exports = router; 