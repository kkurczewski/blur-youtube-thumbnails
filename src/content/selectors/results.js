// search results

const results = (() => {
    const selectors = {
        root: "#page-manager ytd-search",
        channel: "#meta .ytd-channel-name a",
        title: "#video-title",
    }
    const shelfSelector = "ytd-shelf-renderer"
    const videoSelector = `ytd-video-renderer:has(ytd-thumbnail):has(${selectors.channel}):has(${selectors.title})`

    return {
        selectors,
        process: async (root, callback) => {
            const container = await find(root, "ytd-section-list-renderer")
            const sections = container.querySelector("#contents.ytd-section-list-renderer")
            const itemsObserver = DynamicObserver(videoSelector, callback)
            const shelfObserver = DynamicObserver(shelfSelector, processShelf)

            const initialSection = await find(sections, "ytd-item-section-renderer")
            processSection(initialSection)

            observe(sections, "ytd-item-section-renderer", processSection)

            function processSection(section) {
                section.querySelectorAll("#contents.ytd-item-section-renderer").forEach(itemSection => {
                    itemsObserver.observe(itemSection)
                    shelfObserver.observe(itemSection)
                })
            }

            function processShelf(shelf) {
                shelf.querySelectorAll(videoSelector).forEach(callback)
            }
        }
    }
})()