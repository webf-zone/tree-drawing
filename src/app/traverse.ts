import { Tree, TreeNode } from '../models/Tree';
import { AnyShape } from '../shapes/AllShapes';


type Depth = {
  [k: number]: number;
};

// WARNING: EVERYTHING IS MUTABLE HERE. BECAUSE, I AM NOW TIRED OF WRITING THIS CODE.
// IT IS TOO MUCH COMPLEXITY IN A SINGLE DAY.
export function traverse(tree: Tree<AnyShape>) {

  // Depth vs max height
  const depth: Depth = {};

  innerTraverse(tree, 0, 0, depth);

  const heightMatrix = calculateHeight(depth);

  setHeightComputation(tree, heightMatrix);

  return tree;
}


function innerTraverse(tree: Tree<AnyShape>, allWidth: number, depth: number, depthMatrix: Depth) {

  const hasChildren = tree.children.length > 0;

  if (hasChildren) {

    tree.children.forEach((x) => {
      allWidth = innerTraverse(x, allWidth, depth + 1, depthMatrix);
    });

    // Height calculation for parent
    const maxHeight = Math.max(depthMatrix[depth] || 0, tree.context.specs.height);

    depthMatrix[depth] = maxHeight;

    if (tree.children.length === 1) {
      const { x, width } = tree.children[0].context.specs;
      const midChildX = x + (width / 2);

      const selfWidth = tree.context.specs.width;

      // THE HELL: I really hate this let keyword.
      // No JS program should use `let` keyword.
      let newX = midChildX - (selfWidth / 2);

      if (newX < 0) {
        const modulus = moveSubtreeRight(tree, Math.abs(newX) + 50);
        allWidth = allWidth + modulus;

        newX = newX + modulus;
      }

      // In case parent is larger
      if (newX + selfWidth > allWidth) {
        allWidth = newX + selfWidth;
      }

      tree.context.specs.x = newX;
      tree.context.specs.y = depth;

      return allWidth;

    } else {
      const { x: lX } = tree.children[0].context.specs;
      const { x: lR, width: rWidth } = tree.children[tree.children.length].context.specs;

      const selfWidth = tree.context.specs.width;
      const midChildX = lX + ((lR + rWidth) / 2);

      let newX = midChildX - (selfWidth / 2);

      if (newX < 0) {
        const modulus = moveSubtreeRight(tree, Math.abs(newX) + 50);
        allWidth = allWidth + modulus;

        newX = newX + modulus;
      }

      // In case parent is larger
      if (newX + selfWidth > allWidth) {
        allWidth = newX + selfWidth;
      }

      tree.context.specs.x = newX;
      tree.context.specs.y = depth;

      return allWidth;
    }

  } else {
    // Leaf node - Mutation happens here.
    return leafNodeX(tree, allWidth, depth, depthMatrix);
  }

}

function leafNodeX(tree: TreeNode<AnyShape>, allWidth: number, depth: number, depthMatrix: Depth) {

  const { width, height } = tree.context.specs;

  const maxHeight = Math.max(depthMatrix[depth] || 0, height);

  depthMatrix[depth] = maxHeight;

  const x = allWidth + 50;

  tree.context.specs = {
    ...tree.context.specs,
    x,
    y: depth
  };

  return x + width;
}

function setHeightComputation(tree: Tree<AnyShape>, heightMatrix: Depth) {

  const hasChildren = tree.children.length > 0;

  if (hasChildren) {

    tree.children.forEach((x) => {
      setHeightComputation(x, heightMatrix);
    });

  }

  tree.context.specs.y = heightMatrix[tree.context.specs.y];
}


function calculateHeight(depthMatrix: Depth) {

  const newMatrix: Depth = {};

  const depths: number[] = Object.keys(depthMatrix)
    .map((x) => Number(x))
    .sort((a: number, b: number) => b - a);

  const gap = 50;

  depths
    .forEach((y) => {

      // Known max height for next layer
      const yIndex = newMatrix[y + 1];
      const maxHeight = depthMatrix[y + 1];

    if (yIndex) {
      newMatrix[y] = gap + maxHeight + yIndex;
    } else {
      newMatrix[y] = gap;
    }

  });

  return newMatrix;

}


function moveSubtreeRight(tree: TreeNode<AnyShape>, modulus: number) {

  const hasChildren = tree.children.length > 0;

  if (hasChildren) {
    tree.children.forEach((x) => {
      return moveSubtreeRight(x, modulus);
    });
  }

  tree.context.specs.x = tree.context.specs.x + modulus;

  return modulus;
}
