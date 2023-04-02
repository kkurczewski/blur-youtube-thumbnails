// home page

const home = (() => {
    const selectors = {
        root: "#page-manager ytd-browse[page-subtype=home]",
        channel: "#details .ytd-channel-name",
        title: "#details #video-title",
    }
    const videoSelector = `#content:has(ytd-thumbnail):has(${selectors.channel}):has(${selectors.title})`
    console.log(videoSelector)

    return {
        path: "/",
        selectors,
        process: async (root, callback) => {
            const container = await find(root, "#contents.ytd-rich-grid-renderer")
            observe(container, "ytd-rich-grid-row", processRow)
            processRow(container.querySelector("ytd-rich-grid-row"))

            function processRow(row) {
                row.querySelectorAll(videoSelector).forEach(callback)
            }
        }
    }
})()
