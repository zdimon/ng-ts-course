var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket: any){
    console.log('a user connected ');

    socket.on("sockLogin", () => {
        console.log('Getting a new Deck of card!')
        
      });
    
});

app.get('/', function(req: any, res: any){
    res.send('<h1>Hello world</h1>');
  });


http.listen(3000, function(){
  console.log('listening on *:3000');
});
