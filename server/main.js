var Node = require('./node');
var http = require('https');
var GitHubApi = require('github');
var networkAllUsers = [];

module.exports = {

github : new GitHubApi({
version: "3.0.0",
debug: true,
protocol: "https",
host: "api.github.com",
timeout: 5000,
authenticate: {
  type: "oauth",
  key: process.env['GITHUB_CLIENT_ID'],
  secret: process.env['GITHUB_CLIENT_SECRET']
}
}),

loadUserFromServer : function (username,callback){
  userNew = new Node();
  this.github.user.getFrom({
    user: username,
  },function(err,res){
    results = (JSON.parse(JSON.stringify(res)));
    userNew.info = results;
    callback(userNew);
  });
},

loadFollowersFromServer : function (username,callback){
  userNew = new Node();
  this.github.user.getFollowers({
    user: username,
  },function(err,res){
    if(err){
      console.log(err);
    }
    followers = (JSON.parse(JSON.stringify(res)));
    callback(followers);
  });
},

//to dbl check 
loadFollowers : function (user,field,callback){
  this.loadFollowersFromServer(user.info[field],function(followers){
    for(var i = 0;i < followers.length; i++){ 
      current = new Node();
      current.info = followers[i];
      user.addFollower(current);
    };
    callback();
  });
},

loadNetwork : function (node,depth,field,callback){
  var core = this;
  this.loadFollowers(node,field,function(){ 
  if (depth == 0){callback(networkAllUsers);}
  for(var i=0; i < node.followers.length; i++){
    current = node.followers[i];
    id = current.info[field];
    if (networkAllUsers.indexOf(id)===-1)
    { 
      networkAllUsers.push(id);
      core.loadNetwork(current,depth-1,field,callback);
    }  
  }});

}
}



