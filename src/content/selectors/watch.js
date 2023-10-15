// watch page, right panel

async function watchPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const wrapper = await find(pageRoot, "#related #items")

  observeDirectChildrens(wrapper, container => {
    const video = container.querySelector(VIDEO_SELECTOR)
    // last child is continuation element and it doesn't have video
    if (video != null) {
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