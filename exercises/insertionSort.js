function isFirstValueGreaterThanSecond(firstValue, secondValue) {
  return firstValue - secondValue > 0
}

function isFirstValueLowerThanSecond(firstValue, secondValue) {
  return firstValue - secondValue < 0
}

function bubbleSort(array, comparisionFn = isFirstValueLowerThanSecond) {
  for (let index = 1; index < array.length; index++) {
    const element = array[index]
    let position = index - 1
    while (position >= 0) {
      const shouldSwapValues = comparisionFn(element, array[position])
      if (shouldSwapValues) {
        array[position + 1] = array[position]
        position -= 1
      } else {
        break
      }
    }
    array[position + 1] = element
  }
  return array
}

//ascending order
console.log(bubbleSort([2, 3, 4, 1, 34, 5, 12]))
//descending order
console.log(bubbleSort([2, 3, 4, 1, 34, 5, 12], isFirstValueGreaterThanSecond))
