function binarySearch(array, searchValue) {
  //We start the bounds in the first and last indexes of the array
  let lowerBound = 0
  let upperBound = array.length - 1
  //We search the value while the lower bound doesnt catch up with the upper bound
  while (lowerBound <= upperBound) {
    //We calculate the midPoint and the midValue
    const midPoint = Math.floor((lowerBound + upperBound) / 2)
    const midValue = array[midPoint]
    if (searchValue === midValue) {
      //If the midValue is the serachValue we return that index
      return midPoint
    } else if (searchValue < midValue) {
      //If the midValue is lower we move the upper bound to the left to the midPoint
      upperBound = midPoint - 1
    } else if (searchValue > midValue) {
      //If the midValue is upper we move the lower bound to the right to the midPoint
      lowerBound = midPoint + 1
    }
  }
  return null
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 4))
