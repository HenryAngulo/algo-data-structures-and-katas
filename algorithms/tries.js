function TrieNode() {
  let children = {}
  return { children }
}

function Trie() {
  const root = new TrieNode()

  function insert(word) {
    let currentNode = this.root
    for (const char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char]
      } else {
        const newNode = new TrieNode()
        currentNode.children[char] = newNode
        currentNode = newNode
      }
    }
    currentNode.children[`*`] = true
  }
  function search(word) {
    let currentNode = this.root
    for (const char of word) {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char]
      } else {
        return null
      }
    }
    return currentNode
  }

  function collectAllWorlds(node = this.root, word = ``, words = []) {
    for (const [key, childNode] of Object.entries(node.children)) {
      if (key == `*`) {
        words.push(word)
      } else {
        collectAllWorlds(childNode, word + key, words)
      }
    }
    return words
  }
  return { root, insert, search, collectAllWorlds }
}

const trie = new Trie()
trie.insert(`bat`)
trie.insert(`batter`)
trie.insert(`butter`)
trie.insert(`cutter`)
trie.insert(`cut`)
console.log(trie.collectAllWorlds())
