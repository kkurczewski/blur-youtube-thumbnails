// watch page, right panel

async function watchPageObserver(root, videoCallback) {
    const watch = {
        root: "#page-manager > ytd-watch-flexy",
        scroll: "#items.ytd-watch-next-secondary-results-renderer",
        channel: ".details #channel-name",
        title: ".details #video-title",
    }

    const pageRoot = await find(root, watch.root, null)
    const scroll = await find(pageRoot, watch.scroll)

    observe(scroll, VIDEO_SELECTOR, video => {
        videoCallback(new Video(video, watch.channel, watch.title))
    }, true)
}
