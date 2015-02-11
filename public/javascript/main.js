var centerUser;
var centerUserFollowers;
var user = new User();

function loadFollowers(username){
  $.get('https://api.github.com/users/'+ username,function(user){
    centerUser = user;    
  });
  $.get('https://api.github.com/users/'+username+'/followers',function(followers){
    centerUserFollowers = followers;
  });

  // user.login = centerUser.login;
  // user.followers = centerUserFollowers;
}

$(document).ready(function(){
   $('#add_profile').on('submit', function(event) {
    event.preventDefault();
    loadFollowers($('#username').val());
  });
});