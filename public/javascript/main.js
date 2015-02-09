var centerUser;
var centerUserFollowers;

function loadFollowers(username){
  $.get('https://api.github.com/users/'+ username,function(user){
    centerUser = user;    
  });
  $.get('https://api.github.com/users/'+username+'/followers',function(followers){
    centerUserFollowers = followers;
  });
}

$(document).ready(function(){
   $('#add_profile').on('submit', function(event) {
    event.preventDefault();
    loadFollowers($('#username').val());
  });
});