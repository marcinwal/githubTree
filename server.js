var express=require('express');
var app = express();
var http = require('http');

var server = http.createServer(app);

var port = 9999;

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  res.send('Hello World!');
});

app.get('/users/:user', function(request,response) {
  console.log(request.params.user);
  response.header('Access-Control-Allow-Origin','*');
  response.header('Content-Type', 'application/json; charset=utf-8');
  // response.render(request.params.user);
});


server.listen(port,function(){
  console.log("running server on port "+port);
});
