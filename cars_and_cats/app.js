
var http = require('http');
var fs = require('fs');
var server = http.createServer(function (request, response){
    console.log('client request URL: ', request.url);
    if(request.url === '/') {
        fs.readFile('./views/cars.html', 'utf8', function (errors, contents){
            response.writeHead(200, {'Content-Type': 'text/html'});  
            response.write(contents);  
            response.end(); 
        });
    }
   else if(request.url === '/car1.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/car1.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
      }
      else if(request.url === '/car2.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/car2.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
      }
 
      else if(request.url === '/cats'){
        // notice we won't include the utf8 encoding
        fs.readFile('./views/cat.html', function(errors, contents){
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents);
            response.end();
        })
      }
      else if(request.url === '/images/cat.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cat.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
      }
      else if(request.url === '/images/cat2.jpg'){
        // notice we won't include the utf8 encoding
        fs.readFile('./images/cat2.jpg', function(errors, contents){
            response.writeHead(200, {'Content-type': 'image/jpg'});
            response.write(contents);
            response.end();
        })
      }
     

      else if(request.url === '/cars/new'){
        // notice we won't include the utf8 encoding
        fs.readFile('./views/newcars.html', function(errors, contents){
            response.writeHead(200, {'Content-type': 'text/html'});
            response.write(contents);
            response.end();
        })
      }
  
    else {
        response.writeHead(404);
        response.end('File not found!!!');
    }
});




server.listen(7077);

console.log("Running in localhost at port 7077");
