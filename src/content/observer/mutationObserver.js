function find(target, selector, timeout = 15_000) {
    return new Promise((resolve, reject) => {
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
            }, timeout)
        }

        function tryResolve(observer) {
            const node = target.querySelector(selector)
            if (node) {
                observer.disconnect()
                resolve(node)
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
            addedNodes.forEach(node => {
                if (node.matches?.(selector)) {
                    callback(node)
                }
            })
        })
    }
}