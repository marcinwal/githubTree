// var u = new User();
var centerUser;
var centerUserFollowers;
var user;

function loadFollowers(username){

  var followers_list=[]


  $.get('https://api.github.com/users/'+ username,function(user){
    centerUser = user;    
  });
  $.get('https://api.github.com/users/'+username+'/followers',function(followers){
    centerUserFollowers = followers;

    for(var i = 0;i < centerUserFollowers.length; i++){ 
      console.log(centerUserFollowers[i].login);
      followers_list.push(centerUserFollowers[i].login);
    }
  });


  user = new User();
  user.login = username;
  user.followers = followers_list;
}

$(document).ready(function(){
   $('#add_profile').on('submit', function(event) {
    event.preventDefault();
    loadFollowers($('#username').val());
  });
});