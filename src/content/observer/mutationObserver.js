function find(target, selector) {
  return new Promise(resolve => {
    const observer = new MutationObserver((_, observer) => tryResolve(observer))

    const config = { childList: true, attributes: true }
    observer.observe(target, config)
    tryResolve(observer)

    function tryResolve(observer) {
      const node = target.querySelector(selector)
      if (node) {
        observer.disconnect()
        resolve(node)
      }
    }
  })
}

function observeDirectChildrens(target, callback) {
  const observer = new DirectChildObserver(callback)
  observer.observe(target)
}

class DirectChildObserver {
  #observer
  #callback

  constructor(callback) {
    this.#observer = new MutationObserver(mutations => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(callback)
      })
    })
    this.#callback = callback
  }

  observe(target) {
    this.#observer.observe(target, { childList: true })
    target.children.forEach(this.#callback)
  }
}