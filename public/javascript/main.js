// var centerUser;
// var centerUserFollowers;
var user;
var networkAllUsers;

pass = {
    client_id: "31b2fd9fbe37af7c3ae6",
    client_secret: "52b79f74b10c64a3476b6e4730e17d58e6c70110"
}

function loadUser(username){
  user = new Node();
  path = 'https://api.github.com/users/'+ username +'?client_id=' 
  path += pass.client_id + '&client_secret='+pass.client_secret
  $.get(path,function(user_reply){
      user.info = user_reply;
  });
  $('#formdepth').attr('class','formshow');
  return user;
}

function loadFollowers(user,field,callback){
  path = 'https://api.github.com/users/'+user.info[field]+'/followers';
  path += '?client_id=' + pass.client_id + '&client_secret='+pass.client_secret

  $.get(path,function(followers){
    for(var i = 0;i < followers.length; i++){ 
      current = new Node();
      current.info = followers[i];
      user.addFollower(current);
      callback();
    };
  });
}

function loadNetwork(node,depth,field){
  
  loadFollowers(node,field,function(){
  if (depth == 0){return;}
  for(var i=0; i < node.followers.length; i++){
    current = node.followers[i];
    id = current.info[field];
    console.log(id);
    if (networkAllUsers.indexOf(id)===-1)
    { 
      networkAllUsers.push(id);
      loadNetwork(current,depth-1,field);
    }  
  }});

  // if (depth == 0){return;}
  // for(var i=0; i < node.followers.length; i++){
  //   current = node.followers[i];
  //   id = current.info[field];
  //   if (networkAllUsers.indexOf(id)===-1)
  //   { 
  //     networkAllUsers.push(id);
  //     loadNetwork(current,depth-1,field);
  //   }
  // };
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
    username = $('#username').val();
    loadUser(username);
    // networkAllUsers=[];
    networkAllUsers = [];
    networkAllUsers.push(username);
  });
});