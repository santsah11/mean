var express = require('express');
var app= express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));

app.get("/cats", function (request, response) {
    response.render("cats.ejs")
});


app.get("/details/:id", function (request, response){
   
    // just to illustrate that req.params is usable here:
    //  var id =response.send("You requested the user with id !!: " + request.params.id);
     

    // code to get user from db goes here, etc...
 
    var cats = [
        {favorite_food: " HmMMMMMMm", Age: "3", sleeping_spot: " in the Jungle" }, 

        {favorite_food: "Nothing ", Age: "5", sleeping_spot: " in the Cloud"   } ,
        {favorite_food: "Nothing ", Age: "5", sleeping_spot: " in the Cloud"   } ,
        {favorite_food: "Nothing ", Age: "5", sleeping_spot: " in the Cloud"   } 
       
    ];

 
    response.render('details.ejs', {cat:cats[request.params.id-1]} )
});





app.listen(8000, function() {
    console.log("listening on port!! 8000");
  })


 