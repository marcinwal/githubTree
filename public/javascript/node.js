function Node(){
  this.info = undefined;
  this.followers = [];
  this.following = [];
};

Node.prototype.addFollower = function(node) {
  var new_node = new Node(); 
  new_node.info = node;
  this.followers.push(new_node);
};

// getting all followers from a given note
Node.prototype.getFollowers=function(){
  return this.followers;
};

