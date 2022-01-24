function Node(initialData) {
  const data = initialData
  const nextNode = null
  return { data, nextNode }
}

const firstNode = new Node(`node 1`)
const secondNode = new Node(`node 2`)
const thirdNode = new Node(`node 3`)
firstNode.nextNode = secondNode
secondNode.nextNode = thirdNode

function LinkedList(initialFirstNode) {
  const firstNode = initialFirstNode
  function read(index) {
    let currentNode = this.firstNode
    let currentIndex = 0
    while (currentIndex < index) {
      currentNode = currentNode.nextNode
      currentIndex += 1
      if (currentNode == null) {
        return null
      }
    }
    return currentNode.data
  }
  function search(value) {
    let currentNode = firstNode
    let currentIndex = 0
    while (currentNode != null) {
      if (currentNode.data == value) {
        return currentIndex
      }
      currentNode = currentNode.nextNode
      currentIndex += 1
    }
    return null
  }
  function insert(node, index) {
    if (index === 0) {
      node.nextNode = firstNode
      this.firstNode = node
      return
    }
    let prevNode = null
    let nextNode = firstNode
    let currentIndex = 0
    while (currentIndex < index) {
      if (nextNode == null) {
        throw new Error(`Index to insert out of boundaries`)
      }
      prevNode = nextNode
      nextNode = nextNode.nextNode
      currentIndex += 1
    }
    prevNode.nextNode = node
    node.nextNode = nextNode
    return
  }

  function remove(index) {
    if (index === 0) {
      this.firstNode = this.firstNode.nextNode
      return
    }
    let prevNode = null
    let currentNode = firstNode
    let currentIndex = 0
    while (currentIndex < index) {
      prevNode = currentNode
      currentNode = currentNode.nextNode
      currentIndex += 1
      if (currentNode == null) {
        throw new Error(`Index to delete out of boundaries`)
      }
    }
    prevNode.nextNode = currentNode.nextNode
    return
  }
  return {
    firstNode,
    read,
    search,
    insert,
    remove,
  }
}

const linkedList = new LinkedList(firstNode)

console.log(linkedList.read(2))
console.log(linkedList.search(`node 2`))
const fourthNode = new Node(`node 4`)
linkedList.insert(fourthNode, 2)
linkedList.remove(2)
console.log({ linkedList, firstNode, secondNode, thirdNode, fourthNode })
