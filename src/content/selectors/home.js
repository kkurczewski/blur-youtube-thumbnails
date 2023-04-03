// home page

const home = (() => {
    const selectors = {
        root: "#page-manager ytd-browse[page-subtype=home]",
        channel: "#details .ytd-channel-name",
        title: "#details #video-title",
    }
    const videoSelector = `#content:has(ytd-thumbnail):has(${selectors.channel}):has(${selectors.title})`

    return {
        path: "/",
        selectors,
        process: async (root, callback) => {
            const container = await find(root, "#contents.ytd-rich-grid-renderer")
            observe(container, "ytd-rich-grid-row", processRow)
            container.querySelectorAll("ytd-rich-grid-row").forEach(processRow)

            function processRow(row) {
                row.querySelectorAll(videoSelector).forEach(callback)
            }
        }
    }
})()
