var express = require("express");
var path = require("path");
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));
//app.set('view engine', 'ejs');


app.get('/', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       
    } else {
       req.session.page_views = 1;
    }
    res.render ('index.ejs',{counter:req.session.page_views})
 });

 app.get('/add',function(req,res){
    
        req.session.page_views +=1;
    
     res.redirect('/')
 })





app.listen(8000, function () {
    console.log("listening on port 8000");
});
