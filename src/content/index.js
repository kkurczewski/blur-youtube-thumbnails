window.addEventListener("load", async () => {
    const pageManager = document.querySelector("#page-manager")
    installPage(home)
    installPage(watch)
    installPage(results)

    async function installPage(page) {
        const root = await find(pageManager, page.selectors.root, null)
        const selectors = page.selectors
        const { channels, keywords } = await chrome.storage.local.get()
        page.process(root, node => {
            const video = {
                node,
                channel: node.querySelector(selectors.channel).innerText,
                title: node.querySelector(selectors.title).innerText,
            }
            blur(video, channels, keywords)
        })
    }
})