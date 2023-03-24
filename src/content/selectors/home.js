// home page

const home = (() => {
    const selectors = (() => {
        const channelSelector = "#details .ytd-channel-name"
        const titleSelector = "#details #video-title"
        return {
            video: `#content:has(ytd-thumbnail):has(${channelSelector}):has(${titleSelector})`,
            channel: channelSelector,
            title: titleSelector,
        }
    })()
    return {
        selectors,
        process: async (callback) => {
            const container = await find(document.body, "#contents.ytd-rich-grid-renderer")
            observe(container, "ytd-rich-grid-row", (rows) => {
                rows.forEach(row => callback(row.querySelectorAll(selectors.video)))
            })
            callback(container.querySelectorAll(selectors.video))
        }
    }
})()