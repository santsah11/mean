
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
app.use(bodyParser.json());
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

mongoose.connect('mongodb://localhost/productManager');
var ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title must exist."],
        minlength: [2, "minium length has to be two"]
    },
    price: {
        type: Number,
        required: [true, "Price must be Entere "],
        minlength: [2, "minium length has to be two"]
    },
    imgurl: {
        type: String,
        required: [true, "url must exist."],
        minlength: [2, "minium length has to be two"]
    },

})
var UserSchema = new mongoose.Schema({
    first_name: { type: String, required: [true, "name must be provided"] },
    last_name: { type: String, required: [true, "Last name must be provided"] },
    email: { type: String, required: [true, "email must be provided"] },
    password: { type: String, required: [true, "no bolt email"] },
    birth_date: { type: Date },
}, { timestamps: true });
mongoose.model('User', UserSchema);   //seting up the model
var User = mongoose.model('User');  // retrieving the model and then you can create the instance of it
mongoose.Promise = global.Promise;
mongoose.model('Product', ProductSchema);   //seting up the model
var Product = mongoose.model('Product');
// =======================================================================


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
                console.log('erroooooor');
                res.json({
                    status: false,
                    err: err
                });

            } else {
                console.log('sucesses');
                res.json({
                    status: true

                });
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
            res.json({
                status: false,
                err: err
            });
        }
        else if (user) {
            console.log("USER FOUND FOR LOGIN !!!");
            bcrypt.compare(req.body.password, user.password, function (err, result) {
               
                console.log(result)
                if (err) {
                    res.json({
                        status: false,
                        err: err
                    });
                }
                else if (result) {
                    res.json({
                        status: true,
                        result :result
                    });
                    
                } else {
                    res.json({
                        status: false,
                        err: err
                    });
                }
            });
        }
        else {
            res.json({
                status: true,
                user: user
            });
        }
        console.log("FOUND USER!", user);
    })

})



// ====================================================================
app.post("/create", function (req, res) {
    console.log("SERVER > POST /cakes, req.body: ", req.body);
    Product.create(req.body, (err, result) => {
        if (err) {
            console.log('eeeeeeeeeeerrrrrrrrrrrrr')
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


// app.post('/create', function(req, res) {
//     product_inst = new Product(req.body);
//     console.log('for data', req.body)
//     product_inst.save(function (err, data) {
//         if (err){
//             console.log("SERVER ERROR creating new product")
//         }
//         else {
//             console.log(product_inst)
//             res.json(data);
//         }
//     });
// });



app.get('/products', function (req, res) {
    console.log("SERVER > GET /products");
    Product.find({}, (err, allProducts) => {
        if (err) {
            console.log('we  did not find any object inside the database')
        } else {

            res.json(allProducts)
        }
    });
});
app.get('/products/:id', function (req, res) {
    console.log("SERVER > GET /product");
    Product.findOne({ _id: req.params.id }, (err, result) => {
        if (err) {
            console.log('eeeeeeeeeeerrrrrrrrrrrrr')
            res.json({
                status: false,
                err: err
            });
        }
        else {
            console.log(result)
            res.json({
                status: true,
                result: result

            });
        }
    });
});


app.delete("/product/:id", function (req, res) {
    console.log("SERVER > DELETE /products/:id, req.params.id: ", req.params.id);
    Product.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) { console.log(err) }
        else {
            res.json(true);
        }
    })
})

app.post("/update/", function (req, res) {
    console.log("SERVER > PUT /Products/:id", "req.params.id:", req.params.id, "req.body", req.body);
    //Product.findOneAndUpdate({ _id: req.params.id }, { $set: { title: req.body.title, price: req.body.price, image: req.body.image } }, { runValidations: false }, function (err) {
    Product.findOneAndUpdate({ _id: req.body._id }, { $set: { title: req.body.title, price: req.body.price, imgurl: req.body.imgurl } }, { runValidators: true }, (err, result) => {
        if (err) {
            console.log('eeeeeeeeeeerrrrrrrrrrrrr')
            res.json({
                status: false,
                err: err
            });
        }
        else {
            console.log(" coming up to  here   " + result)
            res.json({
                status: true,
                result: result

            });
        }
    })
})

app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
});



{/* <img src="http://www.clker.com/cliparts/6/q/3/A/1/4/shopping-cart-hi.png" height="50" width="50" alt=""></img> */}
app.listen(5000, function () {
    console.log("listening on port 5000");
});