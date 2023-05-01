// search results

async function resultsPageObserver(root, videoCallback) {
    const results = {
        root: "#page-manager > ytd-search",
        scroll: "#contents.ytd-section-list-renderer",
        container: "#contents.ytd-item-section-renderer",
        channel: "#meta .ytd-channel-name a",
        title: "#video-title",
    }

    const pageRoot = await find(root, results.root, null)
    const scroll = await find(pageRoot, results.scroll)

    observe(scroll, results.container, container => {
        videoObserver(container, videoCallback)
    }, true)

    function videoObserver(container, videoCallback) {
        // result list is loaded asynchronously
        observe(container, VIDEO_SELECTOR, video => {
            videoCallback(new Video(video, results.channel, results.title))
        }, true)
    }
}
