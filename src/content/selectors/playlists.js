// playlist page from results
const PLAYLIST_SELECTORS = {
  channel: "ytd-channel-name #text,ytd-playlist-header-renderer #owner-text",
  title: "#video-title, ytd-playlist-header-renderer #text",
}

async function playlistPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=playlist]")

  const playlistVideos = await find(pageRoot, "ytd-playlist-video-list-renderer #contents")
  observeDirectChildrens(playlistVideos, videoCallback)

  const playlistCover = await find(pageRoot, "ytd-playlist-header-renderer")
  await videoCallback(playlistCover)
}