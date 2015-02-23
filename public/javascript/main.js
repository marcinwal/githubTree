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

  console.log("path:"+path+' field: '+field+' node: '+user);

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
    if (networkAllUsers.indexOf(id)===-1)
    { 
      networkAllUsers.push(id);
      console.log(id);
      loadNetwork(current,depth-1,field);
    }  
  }});
}

function loadNetworkNonROld(node,depth,field){
var toVisit = [];
var visited =[];
var deep;
var current;
var curr;

  toVisit.push([node,depth]); // saves [node,level] to control how deep it is 
  go = true;                  // starts at initial node
  
  // while (toVisit.length > 0){
  while (go){
    
    curr = toVisit.shift();
    if (curr){
      current = curr[0];
      deep = curr[1];
      if((visited.indexOf(current.info[field])===-1) && (deep > 0)){
        visited.push(current.info[field]);
        loadFollowers(current,field,function(){ 
            for(var i=0;i < current.followers.length; i++){
              toVisit.push([current.followers[i],deep-1]);
            }
        });
      }  
    }
    if (toVisit.length===0) {go=false;}  
  }
  return visited;  
}



function loadNetworkNonR(node,depth,field){
var toVisit = [];
var network =[];

  toVisit.push([node,depth]);
  go = true;    
  // loadFollowers(node,field,function(){
    while(go){
      if (toVisit.length > 0)
      {
        visit = toVisit.shift();
        curr = visit[0];
        deep = visit[1];
        loadFollowers(curr,field,function()
        {
          for(i=0;i<curr.followers.length;i++)
          {
            if ((network.indexOf(curr.followers[i].info[field])===-1) && (deep >0))
            {
              toVisit.push([curr.followers[i],deep-1]);
              network.push(curr.info[field]);
            }
          }
          if (toVisit.length === 0){
            go = false;
          }  
        });
      }  
    }
  return network;
}


$('#formdepth').on('submit',function(event){
  event.preventDefault();
  depth = $('#depth').val();
  loadNetwork(user,depth,'login');
  //networkAllUsers = loadNetworkNonR(user,depth,'login')
  // networkAllUsers = loadNetworkNonROld(user,depth,'login')
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