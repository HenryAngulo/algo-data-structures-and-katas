function isFirstValueGreaterThanSecond(firstValue, secondValue) {
  return firstValue - secondValue > 0
}

function isFirstValueLowerThanSecond(firstValue, secondValue) {
  return firstValue - secondValue < 0
}

function Heap(heapType = `max`) {
  const data = []
  const heapComparisionFn =
    heapType == `max`
      ? isFirstValueGreaterThanSecond
      : isFirstValueLowerThanSecond
  function leftChildIndex(index) {
    return index * 2 + 1
  }
  function rightChildIndex(index) {
    return index * 2 + 2
  }
  function parentNodeIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  function insert(value) {
    data.push(value)
    let newNodeIndex = data.length - 1
    while (
      newNodeIndex > 0 &&
      heapComparisionFn(data[newNodeIndex], data[parentNodeIndex(newNodeIndex)])
    ) {
      const parentIndex = parentNodeIndex(newNodeIndex)
      const parentValue = data[parentIndex]
      data[parentIndex] = value
      data[newNodeIndex] = parentValue
      newNodeIndex = parentIndex
    }
  }

  function getChildIndexToSwapOnLowerLevel(index) {
    const leftIndex = leftChildIndex(index)
    const rightIndex = rightChildIndex(index)
    const leftChild = data[leftIndex]
    const rightChild = data[rightIndex]
    if (leftChild != null && rightChild != null) {
      return heapComparisionFn(leftChild, rightChild) ? leftIndex : rightIndex
    } else if (leftChild != null) {
      return leftIndex
    } else if (rightChild != null) {
      return leftChild
    } else {
      return null
    }
  }

  function remove() {
    data[0] = data.pop()
    let childOnLowerLevelIndex = getChildIndexToSwapOnLowerLevel(0)
    let parentIndex = 0
    while (childOnLowerLevelIndex) {
      const parentValue = data[parentIndex]
      data[parentIndex] = data[childOnLowerLevelIndex]
      data[childOnLowerLevelIndex] = parentValue
      parentIndex = childOnLowerLevelIndex
      childOnLowerLevelIndex = getChildIndexToSwapOnLowerLevel(parentIndex)
    }
  }

  function printFormatted() {
    let formattedTree = ``
    const defaultEmptyValue = `-|x|-`
    const maxLevel = Math.log2(data.length) + 1
    const maxItemLength =
      data.reduce((prev, curr) => (curr > prev ? curr : prev), 0).toString()
        .length + 4
    const maxItems = Math.pow(2, maxLevel)
    const lengthOfLastLine = maxItems * maxItemLength
    let currentLevel = [{ value: data[0], index: 0 }]
    let nextLevel = []
    while (nextLevel != null) {
      nextLevel = null
      const itemsNumber = currentLevel.length
      const quadrantLength = lengthOfLastLine / itemsNumber
      const padLeft = Math.floor(quadrantLength / 2)
      const formattedLevel = currentLevel.reduce((prev, node, nodeIndex) => {
        let formattedItem = defaultEmptyValue
        if (node != null) {
          formattedItem = `-|${node.value}|-`
          const leftIndex = leftChildIndex(node.index)
          const leftChild = data[leftIndex]
          if (leftChild != null) {
            if (nextLevel == null) {
              nextLevel = Array.from({
                length: itemsNumber * 2,
              })
            }
            nextLevel[nodeIndex * 2] = { value: leftChild, index: leftIndex }
          }
          const rightIndex = rightChildIndex(node.index)
          const rightChild = data[rightIndex]
          if (rightChild != null) {
            if (nextLevel == null) {
              nextLevel = Array.from({
                length: itemsNumber * 2,
              })
            }
            nextLevel[nodeIndex * 2 + 1] = {
              value: rightChild,
              index: rightIndex,
            }
          }
        }
        return `${prev}${formattedItem
          .padStart(padLeft + maxItemLength / 2, `-`)
          .padEnd(quadrantLength, `-`)}`
      }, ``)
      formattedTree += `${formattedLevel}\n\n\n`
      currentLevel = nextLevel
    }
    console.log(formattedTree)
    return formattedTree
  }
  return {
    get rootNode() {
      return data[0]
    },
    get lastNode() {
      return data[data.length - 1]
    },
    insert,
    remove,
    printFormatted,
  }
}
const heap = new Heap()

heap.insert(98)
heap.insert(88)
heap.insert(25)
heap.insert(87)
heap.insert(16)
heap.insert(8)
heap.insert(12)
heap.insert(86)
heap.insert(50)
heap.insert(2)
heap.insert(15)
heap.insert(3)
heap.printFormatted()
heap.remove()
heap.printFormatted()
