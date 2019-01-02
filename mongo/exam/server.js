
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

mongoose.connect('mongodb://localhost/examMoview');
var ReviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, " rating must exist."]
  },

  star: {
    type: Number,
    required: [true, "Comment must exist."]
  },
  comment: {
    type: String,
    required: [true, "Comment must exist."]
  }

})
mongoose.model('Review', ReviewSchema);   //seting up the model
var Review = mongoose.model('Review');



var MoviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Product title must exist."],
    minlength: [3, "minium length has to be two"]

  },
  reviews: { type: [ReviewSchema] }
})

mongoose.model('Moview', MoviewSchema);   //seting up the model
var Moview = mongoose.model('Moview');


app.get("/movies", function(req, res){
var Moview = mongoose.model('Moview');
  Moview.find({}, function(err, movies){
      if(err){
          res.json({
              status: false,
              err: err
          })
      } else {
          res.json({
              status: true,
              movies: movies
          })
      }
  })
})

app.get("/movies/:id", function(req, res){
  Movie.findOne({_id: req.params.id}, function(err, movie){
      console.log(movie);
      console.log(movie.reviews);
      res.json({
          status: true,
          ratings: movie.reviews
      })
  })
})

app.post("/create", function (req, res) {
  console.log("SERVER > POST /rate, req.body: ", req.body);

  Moview.create({ title: req.body.title }, function (err, newMovie) {
    if (err) {
      return res.json({
        status: false,
        err: err
      });
    } else {
      Review.create({ name: req.body.name, star: req.body.star, comment: req.body.comment }, function (err, newRating) {

        if (err) {
          console.log('Helo111')
          return res.json({
            status: false,
            err: err
          })
        } else {
          console.log(newRating)
          newMovie.reviews.push(newRating);
          newMovie.save(function (err) {
            console.log("fgdshfdshk")
            if (err) {
              console.log('helllo3')
              return res.json({
                status: false,
                err: err
              })
            } else {
              console.log("TRUE WIN")
              return res.json({
                status: true,
              })
            }
          })
        }

      })
    }



  })

})






app.all("*", (req, res, next) => {
  res.sendFile(path.resolve("./public/dist/public/index.html"))
});




app.listen(5000, function () {
  console.log("listening on port 5000");
});


