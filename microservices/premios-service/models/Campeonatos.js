const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db.js');

class Campeonato extends Model{}

Campeonato.init({
    id: {
       type: DataTypes.INTEGER,
       primaryKey: true
    },
    id_campeon: {
        type: DataTypes.INTEGER 
    },
    anio_campeonato: {
        type: DataTypes.INTEGER 
    },
    lugar: {
        type: DataTypes.STRING 
    },
    categoria_ganada: {
        type: DataTypes.STRING 
    },
    pais_competencia: {
        type: DataTypes.STRING 
    },
    premio: {
        type: DataTypes.INTEGER 
    },
    puntaje: {
        type: DataTypes.STRING 
    },
},{
    sequelize,
    modelName: 'campeonatos',
    timestamps: false
})

module.exports = Campeonato;