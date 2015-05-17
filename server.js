var express=require('express');
var app = express();
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var loadTree = require('./server/main');


var pass; 

var server = http.createServer(app);

var portLocal = 3000;

var node;


app.set('port',process.env.PORT||portLocal);
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
// app.use(cookieParser);



app.get('/',function(request,response){
  response.render('index');
});


app.post('/',function(req,res){
  console.log(req.params);
  console.log(req.body);
  res.send('200');
});

app.get('/start',function(req,res){
  res.render('start');
});



app.post('/start',function(req,res){
  // console.log(req.params);
  // console.log(req.body); 
  loadTree.loadUserFromServer('marcinwal',function(user){
    console.log('calling from a server:')
    console.log(user.info.login);
    node = user;
    loadTree.loadFollowersFromServer('marcinwal',function(followers){
      console.log('number of followers:'+followers.length);
    });
  });

  res.send('200');
});

app.get('/users/:user', function(request,response) {
  console.log(request.params.user);
  response.header('Access-Control-Allow-Origin','*');
  response.header('Content-Type', 'application/json; charset=utf-8');
  response.render(request.params.user);
});


server.listen(app.get('port'),function(){
  pass = {
    client_id: process.env['GITHUB_CLIENT_ID'],
    client_secret: process.env['GITHUB_CLIENT_SECRET']
  };
  console.log("running server on port:"+app.get('port'));
});
