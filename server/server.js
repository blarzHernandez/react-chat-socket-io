//get our dependencies
var app = require("express")();
var path = require("path");
var server = require("http").Server(app);
var io = require("socket.io")(server);

var port= 3001;

//app.use(this(path.join(__dirname,'public')));

//routing handlers
app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


//Listen io events
io.on("connection",socket => {
    console.log(socket.id);
    socket.on("SEND_MESSAGE",message => {
        console.log(message);
       io.emit("RECEIVE_MESSAGE",message);
        
    });
});

server.listen(port,(error) => {
    if(error){
        console.log("Error",error);
    }else{
        console.log(`Listening on port: ${ port }`);
    }
   
})