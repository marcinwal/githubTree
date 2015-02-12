function User(){
  this.info = undefined;
  this.followers = undefined;
  this.following = undefined;
};

User.prototype.add_follower = function(user) {
  var new_user = new User(); 
  new_user.info = user;
  this.followers.push(new_user);
};