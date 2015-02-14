function Node(){
  this.info = undefined;
  this.followers = [];
  this.following = [];
};

Node.prototype.add_follower = function(node) {
  var new_node = new Node(); 
  new_node.info = node;
  this.followers.push(new_node);
};