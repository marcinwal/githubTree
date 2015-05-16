var express=require('express');
var app = express();
var http = require('http');

var server = http.createServer(app);

var portLocal = 3000;
var pass;
var path = "https://localhost:3000";


pass = {
    client_id: process.env.GIHHUB_CLIENT_ID, 
    client_secret: process.env.GIHHUB_CLIENT_SECRET_ID 
};

app.set('port',process.env.PORT||portLocal);
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
  // res.render('index');
  res.render('index',{path:path});
});

app.post('/',function(req,res){
  console.log(req.params);
  console.log(req.body);
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
