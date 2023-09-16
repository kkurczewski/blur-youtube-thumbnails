// watch page, right panel

async function watchPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const wrapper = await find(pageRoot, "#related #items")
  const scroll = await find(wrapper, `:has(${VIDEO_CONTAINER}) #contents`)

  observeDirectChildrens(scroll, container => {
    const video = container.querySelector(VIDEO_SELECTOR)
    // last child is continuation element and it doesn't have video
    if (video != null) {
      videoCallback(video)
    }
  })
}