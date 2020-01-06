export interface TreeNode<T = any> {

  context: T;

  children: TreeNode<T>[];
}


export interface Tree<T> extends TreeNode<T> {}


export interface Forest<T> {
  trees: Tree<T>[];
}
