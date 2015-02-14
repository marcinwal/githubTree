// var u = new User();
var centerUser;
var centerUserFollowers;
var user;


function loadFollowers(user){
  var followers_list=[]

  $.get('https://api.github.com/users/'+user.info.login+'/followers',function(followers){
    for(var i = 0;i < followers.length; i++){ 
      // followers_list.push(centerUserFollowers[i]);
      user.add_follower(followers[i])
    }
  });
}

function loadUser(username){

  user = new Node();
  $.get('https://api.github.com/users/'+ username,function(user_reply){
      user.info = user_reply;
      console.log(user_reply);   
  });
}

$(document).ready(function(){
   $('#add_profile').on('submit', function(event) {
    event.preventDefault();
    loadUser($('#username').val());
  });
});