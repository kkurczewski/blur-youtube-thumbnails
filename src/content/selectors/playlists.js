/** @param {VideoCallback} videoCallback */
async function playlistPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=playlist]")

  const playlistVideos = await find(pageRoot, "#contents:not(:has(#contents))")
  observeDirectChildrens(playlistVideos, videoCallback)
}

const WATCH_PLAYLIST_SELECTORS = {
  title: "#video-title",
  channel: "#byline",
}

/** @param {VideoCallback} videoCallback */
async function watchPlaylistObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const container = await find(pageRoot, "#playlist #items")
  // sometimes there is slight delay when loading videos so observe children for resiliency
  observeDirectChildrens(container, videoCallback)
}