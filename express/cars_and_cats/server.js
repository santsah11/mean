
var express = require("express");
var app = express();

app.use(express.static(__dirname+ "/static"));

app.get("/cars.html", function (request, response) {
 
    response.render("views");
})


app.get("/cats.html",function (request, response){
    response.render();
});
app.get("/form.html",function (request, response){
    response.render();
});



app.listen(1337);
