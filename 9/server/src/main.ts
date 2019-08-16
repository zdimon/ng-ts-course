var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var users_online = [];

io.on('connection', function(socket: any){
    console.log('a user connected ');

    socket.on("LoginEvent", (data: any) => {
        console.log('login');
        socket.usename = data.data;
        users_online.push(data.data);
        console.log(users_online);
        socket.emit('action:Login');
      });

      socket.on('disconnect', function () {
        console.log(`disconect ${socket.usename}`);
        users_online.splice(users_online.indexOf(socket.username),1);
        console.log(users_online);
      });

    
});

app.get('/', function(req: any, res: any){
    res.send('<h1>Hello world</h1>');
  });


http.listen(3000, function(){
  console.log('listening on *:3000');
});
