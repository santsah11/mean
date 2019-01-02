
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
mongoose.connect('mongodb://localhost/message_board');

var CommentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: [2, 'your name should be more than two character'] },
    content: { type: String, required: [true, 'Post mus to have  some contents'] },

}, { timestamps: true });

var PostSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: [2, 'your name should be more than two character'] },
    content: { type: String, required: [true, 'Message must have  some contents'] },
    comments: [CommentSchema]
}, { timestamps: true });
var Comment = mongoose.model('Comment', CommentSchema);// setting up the model 
var Post = mongoose.model('Post', PostSchema);// setting up the model& getting the schema


mongoose.Promise = global.Promise;

app.get('/', function (req, res) {
    console.log('Displaying Home page')
    Post.find({}, function (err, user_post) {
        if (err) {
            console.log(err)
        } else {
            console.log("worked")
            res.render('index', { user_post: user_post});
        }
    })
    //  Comment.find({},function(err, user_comment){
    //     if(err){
    //         console.log('we have an error')
    //     }else{
    //         console.log('worked fine')
    //         res.render('index', {user_comment:user_comment})
    //     }
    //  })

});

// app.post('/postmessage', function (req, res) {
//     db.students.insert({ name: "Emily", home_state: "California", lucky_number: 8, birthday: { month: 12, day: 25, year: 1901 } })
// })

app.post('/postmessage', function (req, res) {
   
    var post = new Post({name:req.body.name, content:req.body.content });
    post.save(function (err) {
        if (err) {
            console.log('We have an error', err);
            for (var key in err.errors) {
                req.flash('errorMassage', err.errors[key].message);
            }
            res.redirect('/');
        }
        else {
            console.log('sucessfully added to the quote')
            res.redirect('/');
        }
    })

});
app.post('/commentmessage/:id',function(req, res){
var comment = new Comment({name: req.body.name, content:req.body.content });

console.log(comment)
comment.save(function (err) {
    if (err) {
        console.log('We have an error', err);
        for (var key in err.errors) {
            req.flash('errorMassage', err.errors[key].message);
        }
        res.redirect('/');
    }
    else {
        console.log('sucessfully added to the comments')
        Post.findByIdAndUpdate({_id:req.params.id},{$push:comments[comment]})

        // db.students.update({ _id: ObjectId("5be0dd038735c87dd4993131") }, { $push: { interests: 'jogging' } })
        res.redirect('/');
    }
})
})


app.listen(5000, function () {
    console.log("listening on port 5000");
});