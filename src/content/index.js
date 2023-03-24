function callback(nodes, selectors) {
    nodes.forEach(node => blur(preprocess(node)))
    console.debug(`Blurred ${nodes.length} nodes`)

    function preprocess(node) {
        const channel = node.querySelector(selectors.channel).innerText
        const title = node.querySelector(selectors.title).innerText

        return { channel, title, node }
    }
}

document.addEventListener("yt-navigate-finish", onPageChanged)
window.addEventListener("onload", onPageChanged)

async function onPageChanged() {
    switch (window.location.pathname) {
        case "/": blur(home)
            break
        case "/watch": blur(watch)
            break
        case "/results": blur(results)
            break
    }

    async function blur(page) {
        page.apply((nodes) => callback(nodes, page.selectors))
    }
}