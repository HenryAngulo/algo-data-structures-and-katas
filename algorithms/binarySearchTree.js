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
    levelsInfo = { maxLevel: 0, maxItemLength: 0 },
    currentLevel = 0,
  ) {
    if (node == null) {
      return null
    } else {
      levelsInfo.maxItemLength = Math.max(
        levelsInfo.maxItemLength,
        node.value.toString().length,
      )
      levelsInfo.maxLevel = Math.max(levelsInfo.maxLevel, currentLevel)
      printFormatted(node.leftChild, levelsInfo, currentLevel + 1)
      printFormatted(node.rightChild, levelsInfo, currentLevel + 1)
      if (currentLevel === 0) {
        let formattedTree = ``
        const defaultEmptyValue = `|x|`
        let { maxLevel, maxItemLength } = levelsInfo
        maxItemLength = maxItemLength + 4
        const maxItems = Math.pow(2, maxLevel)
        const lengthOfLastLine = maxItems * maxItemLength
        let currentLevel = [this.rootNode]
        let currentLevelIndex = 0
        let isNextLevelValid = true
        while (isNextLevelValid) {
          isNextLevelValid = false
          const nextLevel = Array.from({
            length: Math.pow(2, currentLevelIndex + 1),
          })
          const itemsNumber = Math.pow(2, currentLevelIndex)
          const quadrantLength = lengthOfLastLine / itemsNumber
          const padLeft = Math.floor(quadrantLength / 2)
          let formattedLevel = ``
          currentLevel.forEach((item, itemIndex) => {
            formattedLevel += `${
              item ? `-|${item.value}|-` : defaultEmptyValue
            }`
              .padStart(padLeft + maxItemLength / 2, `-`)
              .padEnd(quadrantLength, `-`)
            if (item?.leftChild != null) {
              isNextLevelValid = true
              nextLevel[itemIndex * 2] = item.leftChild
            }
            if (item?.rightChild != null) {
              isNextLevelValid = true
              nextLevel[itemIndex * 2 + 1] = item.rightChild
            }
          })
          formattedLevel.padEnd(lengthOfLastLine, `-`)
          formattedTree += `${formattedLevel}\n\n\n`
          currentLevel = nextLevel
          currentLevelIndex += 1
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

const root = new TreeNode(50)
const binarySearchTree = new BinarySearchTree(root)
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
