/*
The number of goals achieved by two football teams in matches in a league is given in the form of two lists. For each match of team B, compute the total number of matches of team A where team A has scored less than or equal to the number of goals scored by team B in that match.

Example

teamA = [1, 2, 3]

teamB = [2, 4]

Team A has played three matches and has scored teamA = [1, 2, 3] goals in each match respectively. Team B has played two matches and has scored teamB = [2, 4] goals in each match respectively. For 2 goals scored by team B in its first match, team A has 2 matches with scores 1 and 2. For 4 goals scored by team B in its second match, team A has 3 matches with scores 1, 2 and 3. Hence, the answer is [2, 3].

Function Description

Complete the function counts in the editor below.

counts has the following parameter(s):

    int teamA[n]:  first array of positive integers

    int teamB[m]:  second array of positive integers

Return

    int[m]: an array of m positive integers, one for each teamB[i] representing the total number of elements from teamA[j] satisfying teamA[j] ≤ teamB[i] where 0 ≤ j < n and 0 ≤ i < m, in the given order.

Constraints

2 ≤ n, m ≤ 105
1 ≤ teamA[j] ≤ 109, where 0 ≤ j < n.
1 ≤ teamB[i] ≤ 109, where 0 ≤ i < m.
*/

function binarySearchAndReturnNumberOfLowerValues(array, value) {
  let lowerBound = 0
  let upperBound = array.length - 1
  while (lowerBound <= upperBound) {
    const midPoint = Math.floor((lowerBound + upperBound) / 2)
    const midValue = array[midPoint]
    const nextValue = array[midPoint + 1]
    if (midValue <= value && nextValue > value) {
      return midPoint + 1
    }
    if (midValue > value) {
      upperBound = midPoint - 1
    } else {
      lowerBound = midPoint + 1
    }
  }
  return upperBound + 1
}

function counts(teamA, teamB) {
  teamA.sort((a, b) => a - b)
  const lessOrEqualTeamAMatches = teamB.map((goalsB) =>
    binarySearchAndReturnNumberOfLowerValues(teamA, goalsB),
  )
  return lessOrEqualTeamAMatches
}

const testCase = counts([2, 10, 5, 4, 8], [3, 1, 7, 8])

return testCase
