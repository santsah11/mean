
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
}));


mongoose.connect('mongodb://localhost/quotes');
var QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: [2, 'your name should be more than two character'] },
    quote: { type: String, required: true, minlength: [2, 'quotes has to be more than two chracter'] }
}, { timestamps: true });

mongoose.model('Quote', QuoteSchema);// setting up the model 
var Quote = mongoose.model('Quote')// getting the model to use it different palceses
mongoose.Promise = global.Promise;

app.get('/', function (req, res) {
    console.log('heloo checking ')
    res.render('index');
});

app.post('/addquotes', function (req, res) {
    var quote = new Quote({ name: req.body.name, quote: req.body.quote });
    quote.save(function (err) {
        if (err) {
            console.log('We have an error', err);
            for (var key in err.errors) {
                req.flash('errorMassage', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            console.log('sucessfully added to the quote')
            res.redirect('/quotes');
        }
    })

});
app.get('/quotes', function (req, res) {
    Quote.find({}, function (err, quotes) {
        if (err) {
            console.log(err)
        } else {
            console.log("worked")
            res.render('quotes', { info: quotes });
        }
    })
})








app.listen(8000, function () {
    console.log("listening on port 8000");
});