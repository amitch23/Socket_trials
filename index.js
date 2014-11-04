//like python import lines, importing libraries /methods
//'express' initializes app to be a function handler that I can supply to an http server as seen in next line
var express = require('express');
var app = express();
var http = require('http').Server(app);
//initialize a new instance of socket.io by passing the http (http server object). 
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

//define a route handler/that gets called when we hit our website home. render index.html template
app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});


//listen on the connection event for incoming sockets from clients, do the things inside the function
io.on('connection', function(socket){

//2. listen for an event, 'image' to be passed from the client, then call the function, which sends a me-named 'putimage' function and an image url.	
  socket.on('image', function(){
    io.emit('putimage', "panda.jpg");
  });

});


//make the http server listen on port 3000
http.listen(3000, function(){
  console.log('listening on *:3000');
});