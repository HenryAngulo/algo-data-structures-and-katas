function Queue() {
  const data = []
  function queue(value) {
    data.push(value)
  }
  function read() {
    return data[0]
  }
  function dequeue() {
    return data.shift()
  }

  return {
    queue,
    dequeue,
    read,
    data,
  }
}

function Vertex(initialValue) {
  const value = initialValue
  const adjacentVertices = {}
  function addAdjacentVertex(vertex, weight) {
    adjacentVertices[vertex.value] = weight
  }
  return { value, adjacentVertices, addAdjacentVertex }
}

const vertices = {
  atlanta: new Vertex(`atlanta`),
  boston: new Vertex(`boston`),
  denver: new Vertex(`denver`),
  chicago: new Vertex(`chicago`),
  elPaso: new Vertex(`elPaso`),
}

vertices.atlanta.addAdjacentVertex(vertices.boston, 100)
vertices.atlanta.addAdjacentVertex(vertices.denver, 160)
vertices.boston.addAdjacentVertex(vertices.chicago, 120)
vertices.boston.addAdjacentVertex(vertices.denver, 180)
vertices.denver.addAdjacentVertex(vertices.chicago, 40)
vertices.denver.addAdjacentVertex(vertices.elPaso, 140)
vertices.chicago.addAdjacentVertex(vertices.elPaso, 80)
vertices.elPaso.addAdjacentVertex(vertices.boston, 100)

function deepFirstSearchTraverse(
  vertex,
  visitedVertices = {},
  callback = console.log,
) {
  visitedVertices[vertex.value] = true
  callback(vertex)
  Object.keys(vertex.adjacentVertices).forEach((adjacentVertexName) => {
    if (!visitedVertices[adjacentVertexName]) {
      deepFirstSearchTraverse(
        vertices[adjacentVertexName],
        visitedVertices,
        callback,
      )
    }
  })
}

function breadthFirstSearchTraverse(startingVertex, callback = console.log) {
  const queue = new Queue()
  const visitedVertices = {}
  queue.queue(startingVertex)
  while (queue.read() != null) {
    const currentVertex = queue.dequeue()
    callback(currentVertex)
    Object.keys(currentVertex.adjacentVertices).forEach(
      (adjacentVertexName) => {
        if (!visitedVertices[adjacentVertexName]) {
          visitedVertices[adjacentVertexName] = true
          queue.queue(vertices[adjacentVertexName])
        }
      },
    )
  }
}

deepFirstSearchTraverse(vertices.atlanta)
breadthFirstSearchTraverse(vertices.atlanta)
