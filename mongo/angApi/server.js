var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/public/dist/public' ));



// app.get('/getPokemonbyAbility' ,function( req, res){
//     $get.{ }
//   res.json()
// })




app.listen(5000, function () {
    console.log("listening on port 5000");
});