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
  const relatedItems = await find(pageRoot, "#related") // first step, limit deep search scope

  const container = await find(relatedItems, ":has(> ytd-compact-video-renderer)", true) // deep search, ignore DOM structure
  const recyclingCallback = recyclerCallback(videoCallback)

  observeDirectChildrens(container, video => {
    if (video.matches(`:has(${THUMBNAIL_SELECTOR})`)) {
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
  const player = await find(pageRoot, "#movie_player")

  observeDirectChildrens(player, container => {
    if (container.matches(":has(> .ytp-endscreen-content)")) {
      const endscreen = container.querySelector(".ytp-endscreen-content")
      observeDirectChildrens(endscreen, videoCallback)
    }
  })
}