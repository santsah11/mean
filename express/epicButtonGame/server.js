const express = require('express');
const app = express();
app.set('views',__dirname+'/views');
app.set('view engine', 'ejs');

const server = app.listen(1337);

const io = require('socket.io')(server);
app.get('/',function(req,res){
res.render('index')
})
var counter = 0;
    
io.on('connection', function (socket) {
  socket.on('btnclicked', function(){
      counter++;
      console.log('SERVER RECEIVED')
      io.emit('count', {response : counter});
    
  });
  socket.on('clrbuttonclicked',function(){
      counter = 0;
      io.emit('clear',{counter:counter})
  })
    
});



