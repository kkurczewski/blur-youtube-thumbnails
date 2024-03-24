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

  // there is small (but breaking) difference between anonymous view and logged user
  const wrapper = await find(pageRoot, "#related :is(#items:not(:has(#contents)):has(#video-title), #items #contents)")
  const recyclingCallback = recyclerCallback(videoCallback)

  observeDirectChildrens(wrapper, recyclingCallback)
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