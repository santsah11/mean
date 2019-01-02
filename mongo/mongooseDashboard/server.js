
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
var path = require('path');
// app.use(express.static(path.join(__dirname, './static')));
app.use(express.static( __dirname + '/public/dist/public' ));

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
}));

mongoose.connect('mongodb://localhost/mongoose');
var MongoSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: [2, 'your name should be more than two character'] },
    food: { type: String, required: true, minlength: [2, 'I canot be hungry i need to eat something'] }
}, { timestamps: true });

mongoose.model('Mongo', MongoSchema);// setting up the model 
var Mongo = mongoose.model('Mongo')// getting the model to use it different palceses
mongoose.Promise = global.Promise;

// app.get('/', function (req, res) {
//     console.log('Displaying Mongoose ')
//     Mongo.find({}, function (err, animal) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("worked")
//             // res.render('index', { info: animal});
//             res.json({info: animal})
//         }
//     })
   
// });

app.get('/animals', function (req,res){
    Mongo.find({}, function (err, animal) {
        if (err) {
            console.log(err)
        } else {
            console.log("worked")
            // res.render('index', { info: animal});
            res.json({info: animal})
        }
    })
})
app.get('/displaybyid/:id', function (req, res) {
     Mongo.findOne({_id: req.params.id}, function (err, animal) {
        res.json({animal})
    })
});
app.get('/editbyid/:id', function (req, res) {
     Mongo.findOne({_id: req.params.id}, function (err, animal) {
        res.render('edit', {dis:animal})
    })
});
app.post('/edit/:id', function (req, res) {
    var mongo = new Mongo({ name: req.body.name,food: req.body.food });
    Mongo.update({_id: req.params.id},{$set:{name: mongo.name, food: mongo.food}} ,function (err) {
       res.redirect('/')
   })
});


app.delete('/deletebyid/:id', function (req, res) {
    Mongo.remove({_id: req.params.id}, function (err, data) {
       res.json(data)
   })
});
//db.students.deleteOne({ lucky_number: { $gt: 5 } })

app.get('/add', function (req, res) {
    console.log('Displaying animal ')
    res.render('addnewmongo');
});

app.post('/addnewmongo', function (req, res) {
    var mongo = new Mongo({ name: req.body.name,food: req.body.food });
    mongo.save(function (err) {
        if (err) {
            console.log('We have an error', err);
            for (var key in err.errors) {
                req.flash('errorMassage', err.errors[key].message);
            }
            res.redirect('/add');
        }
        else {
            console.log('sucessfully added to the quote')
            res.redirect('/');
        }
    })

});




app.listen(5000, function () {
    console.log("listening on port 5000");
});