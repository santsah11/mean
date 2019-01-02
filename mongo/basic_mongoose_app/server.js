
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
const flash = require('express-flash');
app.use(flash());
var session = require('express-session');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.get('/', function (req, res) {
     User.find({}, function (err, users) {
      if(err){
          console.log(err)
      } else{
          console.log("worked")
          res.render('index',{info:users});
      }
    })
})


mongoose.connect('mongodb://localhost/basic_mongoose');
// ****************************** no validation here
// var UserSchema = new mongoose.Schema({
//     name: String,
//     age: Number
// })

// ***********************with validation 
var UserSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 2},
    age: { type: Number, min: 1, max: 150 },
});
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
var User = mongoose.model('User') // We are retrieving this Schema from our Models, named 'User'
// Use native promises
console.log("this will be creatine user schema"+UserSchema)
mongoose.Promise = global.Promise;

app.post('/users', function (req, res) {
    console.log("POST DATA", req.body);
    var user = new User({ name: req.body.name, age: req.body.age });
    
    user.save(function (err) {
        if (err) {
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        } else { 
            console.log('successfully added a user!');
            res.redirect('/');
        }
    })
})
// ...delete all records of the User Model
// User.remove({}, function(err){
//     // This code will run when the DB has attempted to remove all matching records to {}
//    })

// *************************** Finding users
   
//    User.findOne({id:'5be127285330ce26e443820a'}, function(err, user) {
//     if (err){
//         console.log(err)
//     }else {
//         console.log('not too bad')
//     }
//    })


// to make a model, you can first define a schema, which is just the BLUEPRINT for a model



app.listen(8000, function () {
    console.log("listening on port 8000");
})
