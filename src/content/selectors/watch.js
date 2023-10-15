// watch page, right panel

async function watchPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")

  // there is small (but breaking) difference between anonymous view and logged user
  const wrapper = await find(pageRoot, "#related :is(#items:not(:has(#contents)):has(#video-title), #items #contents)")

  observeDirectChildrens(wrapper, video => {
    // last element is continuation hence check
    if (video.matches(":has(#video-title)")) {
      videoCallback(video)
    }
  })
}

async function watchPlaylistObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const container = await find(pageRoot, "#playlist #items")
  // sometimes there is slight delay when loading videos so observe children for resiliency
  observeDirectChildrens(container, video => {
    videoCallback(new PlaylistVideo(video))
  })
}