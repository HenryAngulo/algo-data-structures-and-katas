/*
Given an array arr of length n, for each index i from 1 to n, count the number of indices j (j != i), such that either arr[j] is a divisor of arr[i] or arr[j] is a multiple of arr[i].

Note:

x is called a divisor of y if y is divisible by x.
x is called a multiple of y if x is divisible by y.

Example

arr = [1, 3, 4, 2, 6]

For i = 1, Number of divisors of 1 = 0. Number of multiples of 1 = 4.
For i = 2, Number of divisors of 3 = 1. Number of multiples of 3 = 1.
For i = 3, Number of divisors of 4 = 2. Number of multiples of 4 = 0.
For i = 4, Number of divisors of 2 = 1. Number of multiples of 2 = 2.
For i = 5, Number of divisors of 6 = 3. Number of multiples of 6 = 0.
Hence, the answer for the above example is [4, 2, 2, 3, 3].

Function Description

Complete the function getCount in the editor below.

getCount has the following parameter(s):

    int arr[n]: an array of integers

Returns

    int[n]: an array of integers, the answers at each index

Constraints

1 ≤ n ≤ 105
1 ≤ arr[i] ≤ 105
*/
function getCount(arr) {
  const count = []
  arr.forEach((itemI, i) => {
    count[i] = count[i] ?? 0
    for (let j = i + 1; j < arr.length; j++) {
      const itemJ = arr[j]
      count[j] = count[j] ?? 0
      if (itemI % itemJ === 0 || itemJ % itemI === 0) {
        count[i] += 1
        count[j] = count[j] ? count[j] + 1 : 1
      }
    }
  })
  return count
}

const testCase = getCount([7, 4, 8, 16, 32, 20, 31, 2])

console.log(testCase)
