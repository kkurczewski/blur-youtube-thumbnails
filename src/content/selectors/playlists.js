// playlists, right panel

async function playlistObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const container = await find(pageRoot, "#playlist #items")
  container.childNodes.forEach(video => videoCallback(new PlaylistVideo(video)))
}