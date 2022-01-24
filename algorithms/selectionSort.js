function isFirstValueGreaterThanSecond(firstValue, secondValue) {
  return firstValue - secondValue > 0
}

function isFirstValueLowerThanSecond(firstValue, secondValue) {
  return firstValue - secondValue < 0
}

//We receive an array and a comparisionFn (wich for default will be ascending "numerical" order)
function selectionSort(array, comparisionFn = isFirstValueLowerThanSecond) {
  //We start iterating the array
  for (let index = 0; index < array.length; index++) {
    //In each index we assume the first index of this iteration is the lowest value
    let lowestValueIndex = index
    //We do an inner loop starting from the outer index + 1
    for (let innerIndex = index + 1; innerIndex < array.length; innerIndex++) {
      //We read the current item from the inner loop
      const element = array[innerIndex]
      //We compare the current lowest value ('lowest' acording to the comparision function)
      //With the current item and if the comparisionFn return that the current value is "lowest"
      //We update the lowestValueIndex to be the current index in the inner loop
      lowestValueIndex = comparisionFn(array[lowestValueIndex], element)
        ? lowestValueIndex
        : innerIndex
    }
    //If the lowestValueIndex is different from the starting index of the outer loop we swap the values
    if (lowestValueIndex != index) {
      const lowestValue = array[lowestValueIndex]
      array[lowestValueIndex] = array[index]
      array[index] = lowestValue
    }
  }
  return array
}
const testArray = [2, 3, 4, 1, 34, 5, 12]
//ascending order
console.log(selectionSort(testArray))
//descending order
console.log(selectionSort(testArray, isFirstValueGreaterThanSecond))
