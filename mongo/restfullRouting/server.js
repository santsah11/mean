
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(__dirname + '/public/dist/public'));
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
mongoose.connect('mongodb://localhost/restfullTask');
var TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
}, { timestamps: true });
mongoose.model('Task', TaskSchema);   //seting up the model
var Task = mongoose.model('Task');   // retrieving the model and then you can create the instance of it
mongoose.Promise = global.Promise;

app.get('/tasks', function (req, res) {
    Task.find({}, function (err, AllTask) {
        if (err) {
            console.log('we  did not find any object inside the database')
        } else {

            res.json(AllTask)
        }
    })
});
app.post('/task', function (req, res) {
    var task = new Task(req.body);
    task.save(function (err, tasksave) {
        if (err) {
            console.log(err + "we have an error")
        } else {
            console.log('task has been succsessfullly loaded in to the database')
            res.json(tasksave)
        }
    })
});
app.get('/task/:id', function (req, res) {

    Task.findOne({ _id: req.params.id }, function (err, TaskById) {

        if (err) {
            console.log('we  did not find any object inside the database')
        } else {
            console.log('getting the task by iddd ')
            res.json(TaskById)
        }
    })
});
app.put('/task/:id', function (req, res) {
    Task.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title } }, { upsert: false, new: true }, function (err, updateById) {

        if (err) {
            console.log('we  did not find any object inside the database')
        } else {
            console.log('update the task by id ')
            res.json(updateById)
        }
    })
});
app.delete('/task/:id', function (req, res) {

    Task.findByIdAndDelete({ _id: req.params.id }, function (err, deletedById) {

        if (err) {
            console.log('we  did not find any object inside the database')
        } else {
            console.log('deleted by id the taszk ')
            res.json(deletedById)
        }
    })
});

app.listen(5000, function () {
    console.log("listening on port 5000");
});