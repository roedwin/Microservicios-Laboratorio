const express = require("express");
const fetch = require("node-fetch");

//const User = require('../models/Users.js');
const Campeonatos = require('../models/Campeonatos.js');


const router = express.Router();

router.use(express.json());

router.get("/", async(req, res)=>{
    const campeonatos = await Campeonatos.findAll();
    const response = {
        campeonatos
    }
    res.send(response);
})

router.get("/:id", async(req, res)=>{
    const reqId = req.params.id;
    const campeonatos = await Campeonatos.findOne({where: {id: reqId}});
    const response = {
        campeonatos
    }
    res.send(response);
})

//EJEMPLO CON TABLA USERS
/*
router.get('/users', async(req, res)=>{
    const users = await User.findAll();
    const response = {
        users
    }
    res.send(response);
});
router.get('/users/:id', async(req, res)=>{
    const reqId = req.params.id;
    const user = await User.findOne({where: {id: reqId}});
    const response = {
        user
    }
    res.send(response);
});

router.post('/users', async(req, res)=>{
    await User.create(req.body);
    const response = {
        msg: 'Usuario creado'
    }
    res.send(response);
});

router.put('/users/:id', async(req, res) => {
    const reqId = req.params.id;
    const user = await User.findOne({where: {id: reqId}});
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    await user.save();
    const response = {
        user
    }
    res.send(response);
})

router.delete('/users/:id', async(req, res)=>{
    const reqId = req.params.id;
    await User.destroy({where: {id: reqId}});
    const response = {
        msg: 'Usuario Eliminado'
    }
    res.send(response);
})

router.get('/users/lenguaje/:lenguaje', async(req, res)=>{
    const lenguaje = req.params.lenguaje;
    const user = await User.findOne({where: {idioma: lenguaje}});
    if(user===null){
        res.send("No exste usuario que hable ese idioma");        
    }
    const paises = await fetch(`htpp://localhost:8080/api/v2/languages/language/${lenguaje}`);
    const response = {
        msg: 'Paises donde puedo hablar',
        paises
    }
    res.send(response);
})*/

module.exports = router;