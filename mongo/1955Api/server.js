
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
const bcrypt = require('bcrypt');
const flash = require('express-flash');
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var session = require('express-session');

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));


mongoose.connect('mongodb://localhost/1955db');
var PeopleSchema = new mongoose.Schema({
    name: String
});

mongoose.model('People', PeopleSchema);   //seting up the model
var People = mongoose.model('People');   // retrieving the model and then you can create the instance of it
mongoose.Promise = global.Promise;

app.get('/', function (req, res) {
    
    People.find({}, function (err, PeopleResults) {
        if (err) {
            console.log('we  did not find any object inside the database')
        } else {
            res.json({ PeopleResults: PeopleResults })
        }
    })
});

app.get('/new/:name', function (req, res) {
    var peopleInstace = new People({name:req.params.name})
    peopleInstace.save({}, function (err) {
        if (err) {
            console.log('Not able to add')
        } else {
            console.log('people succesfully added to the database')
            res.json(peopleInstace)
        }
    })
});


app.get('/remove/:name', function (req, res) {
    var peopleInstace = new People({name:req.params.name})
    People.deleteOne({name : req.params.name},function (err) {
        if (err) {
            console.log('Not able to add')
        } else {
            console.log('people succesfully deleted from database')
           res.redirect('/')
        }
    })
});

app.get('/:name', function (req, res) {
    var peopleInstace = new People({name:req.params.name})
    People.findOne({name : req.params.name},function (err,peopleresult) {
        if (err) {
            console.log('Not able to find  from the data base')
        } else {
            console.log('Result is on the Page')
           res.json({PeopleResult:peopleresult})
        }
    })
});




app.listen(5000, function () {
    console.log("listening on port 5000");
});