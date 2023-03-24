// search results

const results = (() => {
    const selectors = (() => {
        const channelSelector = "#meta .ytd-channel-name a"
        const titleSelector = "#video-title"
        return {
            video: `ytd-video-renderer:has(ytd-thumbnail):has(${channelSelector}):has(${titleSelector})`,
            channel: channelSelector,
            title: titleSelector,
        }
    })()
    return {
        selectors,
        apply: async (callback) => {
            const container = await find(document.body, "ytd-section-list-renderer")
            const sections = container.querySelector("#contents.ytd-section-list-renderer")
            const observeNode = (root) => observe(root, selectors.video, callback)

            const initialSection = sections.querySelector("ytd-item-section-renderer")
            processSection(initialSection)
            observe(sections, "ytd-item-section-renderer", sections => sections.forEach(processSection))

            function processSection(section) {
                const videos = section.querySelector("#contents.ytd-item-section-renderer")
                callback(videos.querySelectorAll(selectors.video))
                observeNode(videos)
            }
        }
    }
})()