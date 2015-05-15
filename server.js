var express=require('express');
var app = express();
var http = require('http');

var server = http.createServer(app);

var portLocal = 3000;

app.set('port',process.env.PORT||portLocal);
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  // res.render('index');
  res.send('Hello');
});

app.get('/users/:user', function(request,response) {
  console.log(request.params.user);
  response.header('Access-Control-Allow-Origin','*');
  response.header('Content-Type', 'application/json; charset=utf-8');
  response.render(request.params.user);
});


server.listen(app.get('port'),function(){
  console.log("running server on port:"+app.get('port'));
});
