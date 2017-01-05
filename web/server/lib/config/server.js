//Aqui se especifican los puertos a usarse en la apliacion
var path = require('path')
module.exports = {
  httpPort: 8080,
  streamPort: 8082,
  wsPort: 8084,
  staticFolder: path.join(__dirname + '/../../../client') 
};
//Establece el Servicio de archivos estáticos desde el directorio "/client" en el directorio de la aplicación. 
