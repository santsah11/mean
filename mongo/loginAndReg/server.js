
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
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

mongoose.connect('mongodb://localhost/userdb');
var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    birth_date: Date,
}, { timestamps: true });
mongoose.model('User', UserSchema);   //seting up the model
var User = mongoose.model('User');  // retrieving the model and then you can create the instance of it
mongoose.Promise = global.Promise;

app.get('/', function (req, res) {
    console.log('Displaying Login and Registartion page ')

    res.render('index')
});


app.post('/registration', function (req, res) {
    console.log('registration data should  print ***')
    console.log(req.body)
    // var user = new User({ first_name: req.body.fname, last_name: req.body.lname, email: req.body.email, password: req.body.pw, birth_date: req.body.bdate })
    var userInstance = new User(req.body);
    console.log("*************" + userInstance);
    bcrypt.hash(userInstance.password, 10, function (err, hash) {
        userInstance.password = hash;
        userInstance.save(function (err) {
            if (err) {
                console.log(err.errors);
            } else {
                res.redirect('/');
            }
        })
    })
});

app.post("/login", function (req, res) {
    console.log("POST /login")
    console.log("POST DATA: ", req.body);

    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log("ERROR IN RETRIEVEING USER FOR LOGIN")
        }
        else if (user) {
            console.log("USER FOUND FOR LOGIN !!!");
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                console.log(req.body.password)
                console.log(User.password)
                console.log(result)
                if (err) {
                    res.redirect("/");
                }
                else if (result) {
                    req.session.user_id = user._id;
                    res.redirect('/dashboard');
                } else {
                    res.redirect("/");
                }
            });
        }
        else {
            console.log("USER -NOT FOUND- FOR LOGIN")
            res.redirect("/");
        }
        console.log("FOUND USER!", user);
    })

})

app.get('/dashboard', function (req, res) {
    console.log('loggged in successfully')
    res.render('dashboard')
})
app.listen(5000, function () {
    console.log("listening on port 5000");
});