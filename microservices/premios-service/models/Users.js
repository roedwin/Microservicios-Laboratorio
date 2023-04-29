const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/db.js');

class User extends Model{}

User.init({
    username: {
       type: DataTypes.STRING 
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    idioma: {
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'user',
    timestamps: false
})

module.exports = User;