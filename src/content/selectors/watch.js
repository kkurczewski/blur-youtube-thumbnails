const WATCH_PLAYLIST_SELECTORS = {
  channel: "#byline",
  title: "#video-title",
}

const WATCH_ENDSCREEN_SELECTORS = {
  channel: ".ytp-videowall-still-info-author",
  title: ".ytp-videowall-still-info-title",
}

async function watchPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")

  const relatedItems = await find(pageRoot, "#related #items") // first step, otherwise first node is missed on fresh start
  const container = await find(relatedItems, "#contents")
  const recyclingCallback = recyclerCallback(videoCallback)

  observeDirectChildrens(container, video => {
    if (video.matches("ytd-compact-video-renderer")) {
      recyclingCallback(video)
    }
  })
}

async function watchPlaylistObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const container = await find(pageRoot, "#playlist #items")
  // sometimes there is slight delay when loading videos so observe children for resiliency
  observeDirectChildrens(container, videoCallback)
}

// watch page, endscreen suggestions
async function watchEndscreen(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const container = await find(pageRoot, ".ytp-endscreen-content")

  observeDirectChildrens(container, videoCallback)
}