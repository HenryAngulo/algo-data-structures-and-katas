function isFirstValueGreaterThanSecond(firstValue, secondValue) {
  return firstValue - secondValue > 0
}

function isFirstValueLowerThanSecond(firstValue, secondValue) {
  return firstValue - secondValue < 0
}
//We receive an array and a comparisionFn (wich for default will be ascending "numerical" order)
function insertionSort(array, comparisionFn = isFirstValueLowerThanSecond) {
  //We iterate the array starting from the second index
  for (let index = 1; index < array.length; index++) {
    //We read the element at the current index as a pivot and start to read the values to the left
    const element = array[index]
    let position = index - 1
    while (position >= 0) {
      //We calculate if the item at the current position should go to the right to the pivot (according to the comparisionFn provided)
      const shouldSwapValues = comparisionFn(element, array[position])
      if (shouldSwapValues) {
        array[position + 1] = array[position]
        position -= 1
      } else {
        //We can break the current iteration when we find a value that should remain to the left of the pivot
        break
      }
    }
    //We insert the pivot at the remaining gap at the end of each iteration
    array[position + 1] = element
  }
  return array
}

const testArray = [2, 3, 4, 1, 34, 5, 12]
//ascending order
console.log(insertionSort(testArray))
//descending order
console.log(insertionSort(testArray, isFirstValueGreaterThanSecond))
