function isFirstValueGreaterThanSecond(firstValue, secondValue) {
  return firstValue - secondValue > 0
}

function isFirstValueLowerThanSecond(firstValue, secondValue) {
  return firstValue - secondValue < 0
}

function bubbleSort(array, comparisionFn = isFirstValueGreaterThanSecond) {
  let lastOrderedIndex = array.length
  while (lastOrderedIndex > 1) {
    let leftPointer = 0
    let rightPointer = 1
    for (let index = 0; index < lastOrderedIndex; index++) {
      const leftValue = array[leftPointer]
      const rightValue = array[rightPointer]
      const shouldSwapValues = comparisionFn(leftValue, rightValue)
      if (shouldSwapValues) {
        array[leftPointer] = rightValue
        array[rightPointer] = leftValue
      }
      leftPointer += 1
      rightPointer += 1
    }
    lastOrderedIndex -= 1
  }
  return array
}

//ascending order
console.log(bubbleSort([2, 3, 4, 1, 34, 5, 12]))
//descending order
console.log(bubbleSort([2, 3, 4, 1, 34, 5, 12], isFirstValueLowerThanSecond))
