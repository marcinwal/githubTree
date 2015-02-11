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

    //i have all objects ready so maybe it would be better to create a list of objects

    for(var i = 0;i < centerUserFollowers.length; i++){ 
      console.log(centerUserFollowers[i].login);
      followers_list.push(centerUserFollowers[i]);
    }
  });


  user = new User();
  user.followers = followers_list;
}

$(document).ready(function(){
   $('#add_profile').on('submit', function(event) {
    event.preventDefault();
    loadFollowers($('#username').val());
  });
});