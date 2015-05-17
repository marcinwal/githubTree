var Node = require('./node');
var http = require('https');
var GitHubApi = require('github');


var networkAllUsers;
var user;




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

networkAllUsers : networkAllUsers,
userNew : user,
loadUserFromServer : function (username,pass,callback){
  userNew = new Node();
  this.github.user.getFrom({
    user: username,
  },function(err,res){
    results = (JSON.parse(JSON.stringify(res)));
    userNew.info = results;
    callback(userNew);
  });
},

loadFollowersFromServer : function (username,pass){
  userNew = new Node();
  this.github.user.getFollowers({
    user: username,
  },function(err,res){
    if(err){
      console.log(err);
    }
    console.log(JSON.stringify(res));
  });
},

loadFollowers : function (user,field,callback){
  path = 'https://api.github.com/users/'+user.info[field]+'/followers';
  path += '?client_id=' + pass.client_id + '&client_secret='+pass.client_secret;

  console.log("path:"+path+' field: '+field+' node: '+user);

  http.get(path,function(followers){
    for(var i = 0;i < followers.length; i++){ 
      current = new Node();
      current.info = followers[i];
      user.addFollower(current);
      callback();
    };
  });
},

loadNetwork : function (node,depth,field){
  
  loadFollowers(node,field,function(){
  if (depth == 0){return;}
  for(var i=0; i < node.followers.length; i++){
    current = node.followers[i];
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


// module.exports = loadTree;
// module.exports = loadUserFromServer;

