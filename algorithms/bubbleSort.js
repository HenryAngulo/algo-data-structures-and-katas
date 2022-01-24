function isFirstValueGreaterThanSecond(firstValue, secondValue) {
  return firstValue - secondValue > 0
}

function isFirstValueLowerThanSecond(firstValue, secondValue) {
  return firstValue - secondValue < 0
}

//We receive an array and a comparisionFn (wich for default will be ascending "numerical" order)
function bubbleSort(array, comparisionFn = isFirstValueGreaterThanSecond) {
  //We keep track of wich is the lastIndex we know is ordered, wich will upper bound
  //of each iteration, we initialize so the first loop will iterate the whole array
  let lastOrderedIndex = array.length
  //we iterate until the upper bound is 1
  while (lastOrderedIndex > 1) {
    for (let index = 0; index < lastOrderedIndex; index++) {
      const leftValue = array[index]
      const rightValue = array[index + 1]
      //We go and compare pairs of "neightbors" value, starting from the first two
      //And use the comparisionFn to calculate if we should swap them
      const shouldSwapValues = comparisionFn(leftValue, rightValue)
      if (shouldSwapValues) {
        array[index] = rightValue
        array[index + 1] = leftValue
      }
    }
    //We move the upper bound one index to the left, because we can assume that the last
    //value of each iteration will be in  the correct place
    lastOrderedIndex -= 1
  }
  return array
}
const testArray = [2, 3, 4, 1, 34, 5, 12]
//ascending order
console.log(bubbleSort(testArray))
//descending order
console.log(bubbleSort(testArray, isFirstValueLowerThanSecond))
