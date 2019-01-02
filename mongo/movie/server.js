const path = require('path');

// ============ Express ============ 
const express = require('express');
const app = express();

// ============ Body Parser ============ 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// ============ Static Routes ============ 
app.use(express.static(path.join(__dirname, "angular-app/dist/angular-app")));

// ============ Mongoose ============ 
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/movies_db")

const RatingSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: [2, "Title must exist."],
        required: [true, "Title must exist."]
    },
    star: { 
        type: Number, 
        required: [true, "Star must exist."]
    },
    review: { 
        type: String, 
        minlength: [3, "Title must exist."],
        required: [true, "Title must exist."]
    }
}, { timestamps: true });

const MovieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        minlength: [3, "Title must be at least 3 characters long."],
        required: [true, "Title must exist."]
    },
    reviews: [RatingSchema]
}, { timestamps: true });

const Movie = mongoose.model('Movie', MovieSchema);
const Rating = mongoose.model('Rating', RatingSchema);










app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./angular-app-movie-exam/dist/angular-app-movie-exam/index.html"))
});

// ============ Server ============ 
app.listen(8001);