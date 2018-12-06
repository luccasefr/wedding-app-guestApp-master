var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 'http://wedding.apis.approx.com.br/' || 4200;

io.on('connection', (socket) => {

  //Log sempre que um usuario conectar
  console.log('user connected');
  //Log sempre que um cliente desconectar do servidor do websockt
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  //Quando recebermos uma message event do nosso client, print 
  //o conteudo da mensagem e então devolva para o cliente usando
  // io.emit()
  socket.on('message', (message) => {
    console.log("Message Received: " + message);
    io.emit('message', { type: 'new-message', text: message });
  })
});

http.listen(port, () => {
  console.log('listening on *:' + port);
});
