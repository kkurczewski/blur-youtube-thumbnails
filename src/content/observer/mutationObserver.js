function find(target, selector, timeout = 15_000) {
  return new Promise((resolve, reject) => {
    console.time(`find ${selector}`)
    const observer = new MutationObserver((_, observer) => {
      tryResolve(observer)
    })

    const config = { childList: true, attributes: true }
    observer.observe(target, config)
    tryResolve(observer)

    if (timeout) {
      setTimeout(() => {
        observer.disconnect()
        reject(`Timeout for query: document.querySelector("${target.localName}${target.id ? '#' + target.id : ''} ${selector}")`)
        console.timeEnd(`find ${selector}`)
      }, timeout)
    }

    function tryResolve(observer) {
      const node = target.querySelector(selector)
      if (node) {
        observer.disconnect()
        resolve(node)
        console.timeEnd(`find ${selector}`)
      }
    }
  })
}

function observe(target, selector, callback, subtree = false) {
  const observer = new MutationObserver(onMutation)
  const config = { childList: true, subtree }
  observer.observe(target, config)
  target.querySelectorAll(selector).forEach(callback)

  function onMutation(mutations) {
    mutations.forEach(({ addedNodes }) => {
      console.count(`processed mutation ${selector}`)
      addedNodes.forEach(node => {
        console.count(`processed node ${selector}`)
        if (node.matches?.(selector)) {
          callback(node)
          console.count(`matched node ${selector}`)
        }
      })
    })
  }
}