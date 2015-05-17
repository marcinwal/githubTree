var Node = require('./node');
var http = require('https');
var GitHubApi = require('github');


var networkAllUsers;
var user;

var github = new GitHubApi({
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
});

// github.authenticate({
//     type: "oauth",
//     key: process.env['GITHUB_CLIENT_ID'],
//     secret: process.env['GITHUB_CLIENT_SECRET']
// });



module.exports = {

networkAllUsers : networkAllUsers,
userNew : user,
loadUserFromServer2 : function (username,pass){
  userNew = new Node();
  github.user.get({
    user: username,
  },function(err,res){
    if(err){
      console.log(err);
    }
    console.log(JSON.stringify(res));
  });
},

loadFollowersFromServer : function (username,pass){
  userNew = new Node();
  github.user.getFollowers({
    user: username,
  },function(err,res){
    if(err){
      console.log(err);
    }
    console.log(JSON.stringify(res));
  });
},

loadUserFromServer : function(username,pass){
path = 'https://api.github.com/followers/'+username;
// path += '?client_id=' + pass.client_id + '&client_secret='+pass.client_secret;  

  http.get(path,function(error,result){
  if(error){
    console.log("error:");
    console.log(error);
  }else{  
    console.log(error);
    console.log(JSON.stringify(result));
  }
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

