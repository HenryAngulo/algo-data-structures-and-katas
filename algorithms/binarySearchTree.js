function TreeNode(
  initialValue,
  initialLeftChild = null,
  initialRightChild = null,
) {
  const value = initialValue
  const leftChild = initialLeftChild
  const rightChild = initialRightChild

  return {
    value,
    leftChild,
    rightChild,
  }
}

function BinarySearchTree(initialRootNode) {
  const rootNode = initialRootNode
  function search(value, node = this.rootNode) {
    if (node == null || node.value == value) {
      return node
    } else if (value < node.value) {
      return search(value, node.leftChild)
    } else {
      return search(value, node.rightChild)
    }
  }

  function insert(value, node = this.rootNode) {
    if (value <= node.value) {
      if (node.leftChild == null) {
        node.leftChild = new TreeNode(value)
      } else {
        insert(value, node.leftChild)
      }
    } else {
      if (node.rightChild == null) {
        node.rightChild = new TreeNode(value)
      } else {
        insert(value, node.rightChild)
      }
    }
  }

  function remove(value, node = this.rootNode) {
    if (node == null) {
      return null
    } else if (value < node.value) {
      node.leftChild = remove(value, node.leftChild)
      return node
    } else if (value > node.value) {
      node.rightChild = remove(value, node.rightChild)
      return node
    } else if (value == node.value) {
      if (node.leftChild == null) {
        return node.rightChild
      } else if (node.rightChild == null) {
        return node.leftChild
      } else {
        node.rightChild = lift(node.rightChild, node)
        return node
      }
    }
  }
  function lift(node, nodeToDelete) {
    if (node.leftChild != null) {
      node.leftChild = lift(node.leftChild, nodeToDelete)
      return node
    } else {
      nodeToDelete.value = node.value
      return node.rightChild
    }
  }

  function traverse(callback, node = this.rootNode) {
    if (node == null) {
      return null
    }
    traverse(callback, node.leftChild)
    callback(node)
    traverse(callback, node.rightChild)
  }

  function printFormatted(
    node = this.rootNode,
    levelsInfo = { maxLevel: 0, maxNodeValue: 0 },
    currentLevel = 0,
  ) {
    if (node == null) {
      return null
    } else {
      levelsInfo.maxNodeValue = Math.max(levelsInfo.maxNodeValue, node.value)
      levelsInfo.maxLevel = Math.max(levelsInfo.maxLevel, currentLevel)
      printFormatted(node.leftChild, levelsInfo, currentLevel + 1)
      printFormatted(node.rightChild, levelsInfo, currentLevel + 1)
      if (currentLevel === 0) {
        let formattedTree = ``
        const defaultEmptyValue = `-|x|-`
        const maxItemLength = levelsInfo.maxNodeValue.toString().length + 4
        const maxItems = Math.pow(2, levelsInfo.maxLevel)
        const lengthOfLastLine = maxItems * maxItemLength
        let currentLevel = [this.rootNode]
        let nextLevel = []
        while (nextLevel != null) {
          nextLevel = null
          const itemsNumber = currentLevel.length
          const quadrantLength = lengthOfLastLine / itemsNumber
          const padLeft = Math.floor(quadrantLength / 2)
          const formattedLevel = currentLevel.reduce(
            (prev, node, nodeIndex) => {
              let formattedItem = defaultEmptyValue
              if (node != null) {
                formattedItem = `-|${node.value}|-`
                if (node.leftChild != null) {
                  if (nextLevel == null) {
                    nextLevel = Array.from({
                      length: itemsNumber * 2,
                    })
                  }
                  nextLevel[nodeIndex * 2] = node.leftChild
                }
                if (node.rightChild != null) {
                  if (nextLevel == null) {
                    nextLevel = Array.from({
                      length: itemsNumber * 2,
                    })
                  }
                  nextLevel[nodeIndex * 2 + 1] = node.rightChild
                }
              }
              return `${prev}${formattedItem
                .padStart(padLeft + maxItemLength / 2, `-`)
                .padEnd(quadrantLength, `-`)}`
            },
            ``,
          )
          formattedTree += `${formattedLevel}\n\n\n`
          currentLevel = nextLevel
        }

        return formattedTree
      }
    }
  }
  return {
    rootNode,
    search,
    insert,
    remove,
    traverse,
    printFormatted,
  }
}

const rootNode = new TreeNode(50)
const binarySearchTree = new BinarySearchTree(rootNode)
binarySearchTree.insert(25)
binarySearchTree.insert(75)
binarySearchTree.insert(11)
binarySearchTree.insert(12)
binarySearchTree.insert(10)
binarySearchTree.insert(33)
binarySearchTree.insert(30)
binarySearchTree.insert(40)
binarySearchTree.insert(56)
binarySearchTree.insert(52)
binarySearchTree.insert(61)
binarySearchTree.insert(89)
binarySearchTree.insert(82)
binarySearchTree.insert(95)
//binarySearchTree.traverse(console.log)
console.log(binarySearchTree.printFormatted())
/*
Sample output

----------------------|50|----------------------
 
----------|25|--------------------|75|----------
 
----|11|--------|33|--------|56|--------|89|----
 
-|10|--|12|--|30|--|40|--|52|--|61|--|82|--|95|-

*/
