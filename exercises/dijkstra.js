function Vertex(initialName) {
  const name = initialName
  const routes = {}
  function addRoute(vertex, weight) {
    routes[vertex.name] = weight
  }
  return { name, routes, addRoute }
}

const vertices = {
  atlanta: new Vertex(`atlanta`),
  boston: new Vertex(`boston`),
  denver: new Vertex(`denver`),
  chicago: new Vertex(`chicago`),
  elPaso: new Vertex(`elPaso`),
}

vertices.atlanta.addRoute(vertices.boston, 100)
vertices.atlanta.addRoute(vertices.denver, 160)
vertices.boston.addRoute(vertices.chicago, 120)
vertices.boston.addRoute(vertices.denver, 180)
vertices.denver.addRoute(vertices.chicago, 40)
vertices.denver.addRoute(vertices.elPaso, 140)
vertices.chicago.addRoute(vertices.elPaso, 80)
vertices.elPaso.addRoute(vertices.boston, 100)

function dijkstraAlg(initialVertex) {
  const lowestWeightTable = {}
  const lowestPreviousVertex = {}
  const unvisitedVertices = {}
  const visitedVertices = {}
  let currentVertex = initialVertex
  lowestWeightTable[initialVertex.name] = 0
  while (currentVertex) {
    visitedVertices[currentVertex.name] = true
    Object.entries(currentVertex.routes).forEach((route) => {
      const [adjacentVertex, weight] = route
      if (visitedVertices[adjacentVertex] == null) {
        unvisitedVertices[adjacentVertex] = true
      }
      const weightThroughCurrentVertex =
        lowestWeightTable[currentVertex.name] + weight
      if (
        lowestWeightTable[adjacentVertex] == null ||
        lowestWeightTable[adjacentVertex] > weightThroughCurrentVertex
      ) {
        lowestWeightTable[adjacentVertex] = weightThroughCurrentVertex
        lowestPreviousVertex[adjacentVertex] = currentVertex.name
      }
    })
    let minAdjacentVertex = null
    Object.keys(unvisitedVertices).forEach((vertex) => {
      if (minAdjacentVertex == null) {
        minAdjacentVertex = vertex
      } else {
        const vertexWeight = lowestWeightTable[vertex]
        const minCurrentWeight = lowestWeightTable[minAdjacentVertex]
        if (vertexWeight < minCurrentWeight) {
          minAdjacentVertex = vertex
        }
      }
    })
    delete unvisitedVertices[minAdjacentVertex]
    currentVertex = vertices[minAdjacentVertex]
  }

  function searchShortestPath(destinationVertex) {
    if (destinationVertex.name != initialVertex.name) {
      let previousVertex = lowestPreviousVertex[destinationVertex.name]
      const path = [previousVertex, destinationVertex.name]
      while (previousVertex != initialVertex.name) {
        previousVertex = lowestPreviousVertex[previousVertex]
        path.unshift(previousVertex)
      }
      return path
    } else {
      console.log(`La ciudad destino es igual a la ciudad origen`)
      return null
    }
  }
  return {
    lowestWeightTable,
    lowestPreviousVertex,
    searchShortestPath,
  }
}
const atlantaDijkstra = dijkstraAlg(vertices.atlanta)
const atlantaToElPasoShortestPath = atlantaDijkstra.searchShortestPath(
  vertices.elPaso,
)
atlantaToElPasoShortestPath //[ 'atlanta', 'denver', 'chicago', 'elPaso' ]
