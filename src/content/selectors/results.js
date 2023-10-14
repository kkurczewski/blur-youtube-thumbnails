// search results

async function resultsPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-search")
  const scroll = await find(pageRoot, "#primary #contents")

  const wrapperObserver = new DirectChildObserver(container => {
    // playlist are single node but not #dismissible
    if (container.matches("ytd-playlist-renderer")) videoCallback(container)
    // shelves and single videos are nested in #dismissible
    else container.querySelectorAll(VIDEO_SELECTOR).forEach(videoCallback)
  })

  observeDirectChildrens(scroll, async page => {
    const wrapper = await find(page, "#contents")
    wrapperObserver.observe(wrapper)
  })
}