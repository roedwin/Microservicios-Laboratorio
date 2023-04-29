const server = require("./src/app"); // Importamos el servidor desde el archivo app.js
//Conexion a base de datos
const sequelize = require('./database/db.js');
sequelize.sync({force: false}).then(() => console.log('Base de datos conectada'));

server.listen(process.env.PORT || 3000, () => {
  // Iniciamos el servidor en el puerto especificado en la variable de entorno PORT
  console.log(`Servicio activado: ${process.env.PORT || 3000}`);
});