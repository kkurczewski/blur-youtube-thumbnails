// playlist page from results

async function playlistPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=playlist]")
  const playlistCover = await find(pageRoot, "ytd-playlist-header-renderer")
  const playlistVideos = await find(pageRoot, "ytd-playlist-video-list-renderer #contents")

  videoCallback(new PlaylistCover(playlistCover))
  observeDirectChildrens(playlistVideos, video => videoCallback(new Video(video)))
}