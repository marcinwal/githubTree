function Node(){
  this.info = undefined;
  this.followers = [];
  this.following = [];
};

Node.prototype.addFollower = function(node) {
  this.followers.push(node);
};

Node.prototype.addFollow = function(node){
  this.followers.push(node);
}

// getting all followers from a given note
Node.prototype.getFollowers=function(){
  return this.followers;
};

