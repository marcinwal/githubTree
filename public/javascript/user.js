function Node(){
  this.info = undefined;
  this.followers = undefined;
  this.following = undefined;
};

Node.prototype.add_follower = function(node) {
  var new_node = new Node(); 
  new_node.info = node;
  this.followers.push(new_node);
};