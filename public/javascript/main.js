// var GitHubApi = require("github");
var centerUser;
var centerUserFollowers;
var user;
var networkAllUsers= [];

// github.authenticate({
//     type: "oauth",
//     key: "31b2fd9fbe37af7c3ae6",
//     secret: "52b79f74b10c64a3476b6e4730e17d58e6c70110"
// })

function loadUser(username){
  user = new Node();
  $.get('https://api.github.com/users/'+ username,function(user_reply){
      user.info = user_reply;
      networkAllUsers.push(user.info.login); 
  });
  $('#formdepth').attr('class','formshow');
}

function loadFollowers(user,field){
  var followers_list=[]
  path = 'https://api.github.com/users/'+user.info[field]+'/followers';
  $.get(path,function(followers){
    for(var i = 0;i < followers.length; i++){ 
      user.addFollower(followers[i]);
    };
  });
}

function loadNetwork(node,depth,field){
  if (depth == 0)
  {
    return;
  }else
  {
    loadFollowers(node,field);
    depth -=1;
    for(var i=0; i < node.followers.length; i++){
      current = node.followers[i];
      if (networkAllUsers.indexOf(current.info.field)===-1)
      { //searchin one more if not searched previously
        networkAllUsers.push(current.info[field]);
        loadNetwork(current,depth,field);
      }  
    };
    return;
  }
}


$('#formdepth').on('submit',function(event){
  event.preventDefault();
  console.log(event)
  depth = $('#depth').val();
  // loadFollowers(user,'login');
  loadNetwork(user,depth,'login')
});

$(document).ready(function(){
   $('#add_profile').on('submit', function(event) {
    event.preventDefault();
    loadUser($('#username').val());
  });
});