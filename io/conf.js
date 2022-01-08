const socketio = require('socket.io');

module.exports = function(server) {
  // io server
  const io = socketio(server);

  const players = {}; 

  // Pour chaque nouvelle connexion 
  io.on('connection', function(socket) {

    // on enregistre le nouveau joueur
    players[socket.id] = {
      x: 0,
      y: 0, 
      size: 20, 
      speed: 5, 
      c: "#"+((1<<24)*Math.random()|0).toString(16) // Couleurs hex aléatoire
    };

    socket.on('move left',  function() { players[socket.id].x -= players[socket.id].speed; });
    socket.on('move up',    function() { players[socket.id].y -= players[socket.id].speed; });
    socket.on('move right', function() { players[socket.id].x += players[socket.id].speed; });
    socket.on('move down',  function() { players[socket.id].y += players[socket.id].speed; });

    // Pour chaque deconnexion 
    socket.on('disconnect', function() {
      // on supprime le joueur 
      delete players[socket.id];
    })
  });

  function update() {
    io.volatile.emit('players list', Object.values(players));
  }

  setInterval(update, 1000/60);
};
