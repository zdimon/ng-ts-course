import { Deck } from '../../pack.class';
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);



io.on('connection', function(socket: any){
  console.log('a user connected ........');

   socket.on('action:getDeck', () => {
      console.log('Getting deck');
      let deck = new Deck();
      socket.emit('getDeck',deck);
   });


});

app.get('/', function(req: any, res: any){
  res.send('<h1>Hello world</h1>');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
