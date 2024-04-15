/**
 * @param {Element} target 
 * @param {string} selector 
 * 
 * @returns {Promise<Element>}
 */
function find(target, selector, subtree = false) {
  return new Promise(resolve => {
    const observer = new MutationObserver((_, observer) => tryResolve(observer))

    const config = { childList: true, attributes: true, subtree }
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

/**
 * @param {Element} target
 * @param {VideoCallback} callback 
 */
function observeDirectChildrens(target, callback) {
  const observer = new DirectChildObserver(callback)
  observer.observe(target)
}

class DirectChildObserver {
  #observer
  #callback

  /** @param {VideoCallback} callback */
  constructor(callback) {
    this.#observer = new MutationObserver(mutations => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(callback)
      })
    })
    this.#callback = callback
  }

  /** @param {Element} target */
  observe(target) {
    this.#observer.observe(target, { childList: true })
    for (const child of target.children) {
      this.#callback(child)
    }
  }
}