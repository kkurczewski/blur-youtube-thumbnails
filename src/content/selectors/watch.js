// watch page, right panel

const watch = (() => {
    const selectors = (() => {
        const channelSelector = ".details #channel-name"
        const titleSelector = ".details #video-title"
        return {
            video: `#items ytd-compact-video-renderer:has(ytd-thumbnail):has(${channelSelector}):has(${titleSelector})`,
            channel: channelSelector,
            title: titleSelector,
        }
    })()
    return {
        selectors,
        apply: async (callback) => {
            const videos = await find(document.body, "ytd-watch-next-secondary-results-renderer #items")
            observe(videos, selectors.video, callback)
            callback(videos.querySelectorAll(selectors.video))
        }
    }
})()