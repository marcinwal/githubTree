var Node = require('./node');
var http = require('https');
var GitHubApi = require('github');


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
loadFollowers : function (user,callback){
  this.loadFollowersFromServer(user.info.login,function(followers){
    for(var i = 0;i < followers.length; i++){ 
      current = new Node();
      current.info = followers[i];
      console.log('adding new:'+current.info.login);
      console.log('user inside loop load:'+user.followers);
      user.addFollower(current);
    };
    console.log('user inside load:'+user.followers.length);
    callback();
  });
},

loadNetwork : function (node,depth,field,networkAllUsers,callback){
  
  this.loadFollowers(node,field,function(){ 
  if (depth == 0){callback;}
  for(var i=0; i < node.followers.length; i++){
    current = node.followers[i];
    cosole.log(current);
    id = current.info[field];
    if (networkAllUsers.indexOf(id)===-1)
    { 
      networkAllUsers.push(id);
      console.log(id);
      loadNetwork(current,depth-1,field);
    }  
  }});

}
}



