// this is a file to simulate if tree builder is working properly
var master = new Node;
master.info = 'master'

createTree=function(node,how_deep,how_many){
  for(var i=0; i < how_many;i++){
    current = new Node();
    current.info = how_deep+'-'+i;
    if (how_deep === 0) { return;}
      node.addFollow(current);
      createTree(current,how_deep-1,how_many)
  }
};