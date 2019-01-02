var express = require('express');
var app  = express();
var mangoose=require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var path = require('path');
app.use(express.static(__dirname + '/public/dist/public'));




app.listen(5000, function () {
    console.log("listening on port 5000");
});