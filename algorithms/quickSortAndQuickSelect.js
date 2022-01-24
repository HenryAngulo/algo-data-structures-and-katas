function isFirstValueGreaterThanSecond(firstValue, secondValue) {
  return firstValue - secondValue > 0
}

function isFirstValueLowerThanSecond(firstValue, secondValue) {
  return firstValue - secondValue < 0
}

function sorteableArray(initialData) {
  const data = initialData
  //We receive the left and right pointers, by default they will be the array's start and end.
  //And a comparision function, by default will be "numerical" ascending order
  function partition({
    leftIndex = 0,
    rightIndex = data.length - 1,
    comparisionFn = isFirstValueLowerThanSecond,
  } = {}) {
    //The pivot will always be the last element
    const pivotIndex = rightIndex
    const pivot = data[pivotIndex]
    //We move the right pointer to the left of the pivot
    rightIndex -= 1

    while (true) {
      //We move the left pointer to the right until we find a value greater
      //(according to the comparision function) than the pivot
      while (leftIndex < data.length && comparisionFn(data[leftIndex], pivot)) {
        leftIndex += 1
      }
      //We move the right pointer to the left until we find a value lower
      //(according to the comparision function) than the pivot
      while (rightIndex >= 0 && comparisionFn(pivot, data[rightIndex])) {
        rightIndex -= 1
      }
      //If the left pointer catch up (or surpass) the right we break out of the loop
      if (leftIndex >= rightIndex) {
        break
      } else {
        //If not we swap the value in the pointers and continue moving the pointers
        const leftPointerValue = data[leftIndex]
        data[leftIndex] = data[rightIndex]
        data[rightIndex] = leftPointerValue
      }
    }
    //Finally we swap the pivot with the value in the left pointer
    data[pivotIndex] = data[leftIndex]
    data[leftIndex] = pivot
    //We return the left index wich will be useful for the quickSort and quickSelect methods
    return leftIndex
  }
  function quickSort({
    leftIndex = 0,
    rightIndex = data.length - 1,
    comparisionFn = isFirstValueLowerThanSecond,
  } = {}) {
    //The base case is when the subarray has one or zero elements, in wich case we cant
    //continue partinioning the array
    if (rightIndex - leftIndex <= 0) {
      return
    }
    //We partition the array and use the left pointer (wich will be the index of the pivot)
    //And use to divide the array in subArrays to the left and to the right to that index
    const pivotIndex = partition({ leftIndex, rightIndex, comparisionFn })
    //We then recursively apply quickSort to the subarrays of each side
    quickSort({ leftIndex, rightIndex: pivotIndex - 1, comparisionFn })
    quickSort({ leftIndex: pivotIndex + 1, rightIndex, comparisionFn })
  }
  function quickSelect({
    kthLowest,
    leftIndex = 0,
    rightIndex = data.length - 1,
    comparisionFn = isFirstValueLowerThanSecond,
  }) {
    //The base case is when the subarray has one elemente in wich case we know we reach the desired value
    if (rightIndex - leftIndex <= 0) {
      return data[leftIndex]
    }
    //We partition the array and use the left pointer (wich will be the index of the pivot)
    //And use to divide the array in subArrays to the left and to the right to that index
    const pivotIndex = partition({ leftIndex, rightIndex, comparisionFn })
    //If the desired position is to the left we continue doing quickSelect only on the left subArray
    if (kthLowest < pivotIndex) {
      return quickSelect({
        kthLowest,
        leftIndex,
        rightIndex: pivotIndex - 1,
        comparisionFn,
      })
    } else if (kthLowest > pivotIndex) {
      //If otherwise, it's to the right we conversely do the quickSelect to the right subarray
      return quickSelect({
        kthLowest,
        leftIndex: pivotIndex + 1,
        rightIndex,
        comparisionFn,
      })
    } else {
      //If it's equal to the pivotIndex, we encounter the desired position
      return data[pivotIndex]
    }
  }
  return { partition, quickSort, quickSelect, data }
}
const testArray = new sorteableArray([2, 3, 4, 1, 34, 5, 12])
console.log(testArray.quickSelect({ kthLowest: 2 }))
//ascending order
testArray.quickSort()
console.log(testArray.data)
//descending order
testArray.quickSort({ comparisionFn: isFirstValueGreaterThanSecond })
console.log(testArray.data)
