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
  }
}

const queue = new Queue()
queue.queue(1)
queue.queue(3)
console.log(queue.read())
queue.dequeue()
console.log(queue.read())
