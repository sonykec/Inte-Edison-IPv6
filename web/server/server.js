// Módulos a utilizarse.
var childProcess = require('child_process')
  , express = require('express')
  , http = require('http')
  , morgan = require('morgan')
  , ws = require('ws');

// Configuración de los Archivos.
var configServer = require('./lib/config/server'); 
    //Se carga el archivo que se encuentra en el destino ./lib/config/server. Este archivo basicamente contiene las direcciones de los puertos a usarse.


// Parametros de la Aplicacion
var app = express();
//Ahora se crea la aplicación.
//Dependiendo de que se necesite en cada linea, se van a cargar los paramentros que se encuentran en ./lib/config/server

app.set('port', configServer.httpPort); 
//Aqui se indica en que puerto se va a estar escuchando.

app.use(express.static(configServer.staticFolder));
//Esta linea se utiliza para enlazar la pagina index.html a la aplicacion

app.use(morgan('dev')); 
//Morgan permite registrar cada solicitud en la consola.


// Servidor index
require('./lib/routes').serveIndex(app, configServer.staticFolder);
//Aqui se indica la ruta que va seguir el index.html para enlazarse a la aplicacion

http.createServer(app).listen(app.get('port'), function () {
//Aqui se establece la conexion http en el puerto.
  console.log('Servidor HTTP escuchando en el puerto ' + app.get('port'));
});

//Seccion de Video
//Para esta seccion se siguio la siguiente referencia como ayuda:
//https://github.com/phoboslab/jsmpeg/blob/master/stream-server.js

var STREAM_MAGIC_BYTES = 'jsmp';
var width = 320;
var height = 240;
//Variables de ancho y largo que se utilizara para el video


// Servidor WebSocket
var wsServer = new (ws.Server)({ port: configServer.wsPort });
//Aqui se establece la conexion websocket en el puerto
console.log('Servidor WebSocket escuchando en el puerto ' + configServer.wsPort);

wsServer.on('connection', function(socket) {
//Aqui se va establecer una funcion cada vez que se coneccte un websocket
  var streamHeader = new Buffer(8);
  streamHeader.write(STREAM_MAGIC_BYTES);
  streamHeader.writeUInt16BE(width, 4);
  streamHeader.writeUInt16BE(height, 6);
  socket.send(streamHeader, { binary: true });
//Datos que se utilizan para el video

  console.log('Nuevo WebSocket Conectado (' + wsServer.clients.length + ' total)');

  socket.on('close', function(code, message){
    console.log('Desconectado WebSocket (' + wsServer.clients.length + ' total)');
  });
});

wsServer.broadcast = function(data, opts) {
  for(var i in this.clients) {
    if(this.clients[i].readyState == 1) {
      this.clients[i].send(data, opts);
    }
    else {
      console.log('Error: Cliente (' + i + ') no esta conectado.');
    }
  }
};
//Aqui se envia un mensaje de error si el cliente que se quiere conectar, no lo hace con exito.

//Servidor HTTP server to accept incoming MPEG1 stream
http.createServer(function (req, res) {
  console.log(
    'Stream Conectado');
//Aqui se acepta la conexion de video a traves de http

  req.on('data', function (data) {
    wsServer.broadcast(data, { binary: true });
  });
}).listen(configServer.streamPort, function () {
  console.log('Video Stream escuchando por el puerto ' + configServer.streamPort);

//ffmpeg.sh inicia desde node                                              
childProcess.exec('../../bin/ffmpeg.sh');
});
//Desde aqui se manda peticiones a la camara web para que empieze a capturar la imagen con la ayuda de ffmpeg

module.exports.app = app;
//Enlace a los otros archivos
