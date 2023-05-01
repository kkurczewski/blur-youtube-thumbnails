// watch page, right panel

const watch = (() => {
    const selectors = {
        root: "#page-manager ytd-watch-flexy",
        channel: ".details #channel-name",
        title: ".details #video-title",
    }
    const videoSelector = `#items ytd-compact-video-renderer:has(ytd-thumbnail):has(${selectors.channel}):has(${selectors.title})`

    return {
        selectors,
        process: async (root, callback) => {
            const videos = await find(root, "ytd-watch-next-secondary-results-renderer #items")
            observe(videos, videoSelector, callback)
            videos.querySelectorAll(selectors.video).forEach(callback)
        }
    }
})()