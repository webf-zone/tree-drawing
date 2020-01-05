export interface TreeNode<T = any> {

  context: T;

  children: TreeNode[];
}


export interface Tree extends TreeNode {}


export interface Forest {
  trees: Tree[];
}
