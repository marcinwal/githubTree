var centerUser;
var centerUserFollowers;
var user;


function loadFollowers(user,field){
  var followers_list=[]
  $.get('https://api.github.com/users/'+user.info[field]+'/followers',function(followers){
    for(var i = 0;i < followers.length; i++){ 
      user.add_follower(followers[i]);
    };
  });
}

function loadUser(username){
  user = new Node();
  $.get('https://api.github.com/users/'+ username,function(user_reply){
      user.info = user_reply; 
  });
  $('#formdepth').attr('class','formshow');
}

$('#formdepth').on('submit',function(event){
  event.preventDefault();
  console.log(event)
  loadFollowers(user,'login');
});

$(document).ready(function(){
   $('#add_profile').on('submit', function(event) {
    event.preventDefault();
    loadUser($('#username').val());
  });
});