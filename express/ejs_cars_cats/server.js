var express = require("express");
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));

app.get("/cars", function (request, response) {
    response.render("cars.ejs")
});

app.get("/cats", function (request, response) {
    response.render("cats.ejs")
});

app.get("/cars/new", function (request, response) {
    response.render("form.ejs")
});

app.listen(8000, function() {
    console.log("listening on port 8000");
  })
