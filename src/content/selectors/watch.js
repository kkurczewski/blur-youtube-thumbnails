// watch page, right panel

async function watchPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const scroll = await find(pageRoot, "#related #items")

  observeDirectChildrens(scroll, container => {
    container.querySelectorAll(VIDEO_SELECTOR).forEach(videoCallback)
  })
}