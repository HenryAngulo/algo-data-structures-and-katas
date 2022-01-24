function Stack() {
  const data = []
  function push(value) {
    data.push(value)
  }
  function read() {
    return data[data.length - 1]
  }
  function pop() {
    return data.pop()
  }

  return {
    push,
    pop,
    read,
  }
}

const stack = new Stack()
stack.push(1)
stack.push(3)
console.log(stack.read())
stack.pop()
console.log(stack.read())
