
document.addEventListener("yt-navigate-finish", onPageChanged)
window.addEventListener("onload", onPageChanged)

async function onPageChanged() {
    switch (window.location.pathname) {
        case "/": process(home)
            break
        case "/watch": process(watch)
            break
        case "/results": process(results)
            break
    }

    async function process(page) {
        const options = await chrome.storage.local.get()
        const selectors = page.selectors
        page.process(nodes => {
            nodes.forEach(node => blur(preprocess(node), options))
            console.debug(`Blurred ${nodes.length} nodes`)

            function preprocess(node) {
                const channel = node.querySelector(selectors.channel).innerText
                const title = node.querySelector(selectors.title).innerText

                return { channel, title, node }
            }
        })
    }
}