// search results

const results = (() => {
    const selectors = {
        root: "#page-manager ytd-search",
        channel: "#meta .ytd-channel-name a",
        title: "#video-title",
    }
    const videoSelector = `ytd-video-renderer:has(ytd-thumbnail):has(${selectors.channel}):has(${selectors.title})`

    return {
        path: "/results",
        selectors,
        process: async (root, callback) => {
            const container = await find(root, "ytd-section-list-renderer")
            const sections = container.querySelector("#contents.ytd-section-list-renderer")
            const itemsObserver = DynamicObserver(videoSelector, callback)

            const initialSection = await find(sections, "ytd-item-section-renderer")
            processSection(initialSection)

            observe(sections, "ytd-item-section-renderer", processSection)

            function processSection(section) {
                itemsObserver.observe(section.querySelector("#contents.ytd-item-section-renderer"))
            }
        }
    }
})()