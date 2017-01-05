exports.serveIndex = function (app, staticFolder) {
  app.get('*', function (req, res) {
    res.sendFile('index.html', { root: staticFolder });
  });
};
//Esta linea esta enlazada a server.js
//Desde aqui se manda a llamar a la pagina index.
