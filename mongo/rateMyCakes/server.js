
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
mongoose.connect('mongodb://localhost/rateMyCakes');
var RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: [true, " rating must exist."]
    },
    comment: {
        type: String,
        required: [true, "Comment must exist."]
    }

})
mongoose.model('Rate', RatingSchema);   //seting up the model
var Rate = mongoose.model('Rate');
// console.log(Rate)

var CakeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be exit  never be empty."]
    },
    url: {
        type: String,
        required: [true, "url must exist."]
    },
    ratings: {
        type: [RatingSchema],
    },


}, { timestamps: true })

mongoose.model('Cake', CakeSchema);   //seting up the model
var Cake = mongoose.model('Cake');   // retrieving the model and then you can create the instance of it
mongoose.Promise = global.Promise;

app.get('/cakes', function (req, res) {
    console.log("SERVER > GET /cakes");
    Cake.find({}, (err, allcakes) => {
        if (err) {
            console.log('we  did not find any object inside the database')
        } else {

            res.json(allcakes)
        }
    });
});

app.post("/cakes", function (req, res) {
    console.log("SERVER > POST /cakes, req.body: ", req.body);
    Cake.create(req.body, (err, result) => {
        if (err) {
            res.json({
                status: false,
                err: err
            });
        }
        else {
            res.json({
                status: true,
                result: result
            });
        }
    })
})
app.post("/cakes/:id/rate", function (req, res) {
    console.log("SERVER > POST /rate, req.body: ", req.body);

    Cake.findById(req.params.id, function (err, cake) {
        if (err) {
            return res.json({
                status: false,
                err: err
            });
        }
        console.log(cake)
        Rate.create(req.body, (err, result) => {
            if (err) {
                return res.json({
                    status: false,
                    err: err
                });
            }
            console.log(result)
            cake.ratings.push(result);

            cake.save(function (err) {
                console.log(cake.ratings)
                res.json({
                    status: true,
                    result: result
                })
            })
        })
    })
})

app.get('/cakes/:id', function (req, res) {

    Cake.findOne({ _id: req.params.id }, function (err, cakeShow) {
        console.log(cakeShow)
        if (err) {
            console.log('we  did not find any object inside the database')
        } else {
            console.log('getting the task by idd ')
            res.json(cakeShow)
        }

    })
});
app.listen(5000, function () {
    console.log("listening on port 5000");
});