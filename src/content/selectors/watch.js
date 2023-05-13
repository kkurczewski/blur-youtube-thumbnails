// watch page, right panel

async function watchPageObserver(root, videoCallback) {
  const watch = {
    root: "#page-manager > ytd-watch-flexy",
    scroll: "#items.ytd-watch-next-secondary-results-renderer",
  }

  const pageRoot = await find(root, watch.root, null)
  const scroll = await find(pageRoot, watch.scroll)

  observe(scroll, VIDEO_SELECTOR, videoCallback, true)
}
