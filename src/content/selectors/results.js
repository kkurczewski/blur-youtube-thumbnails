// search results

async function resultsPageObserver(root, videoCallback) {
  const results = {
    root: "#page-manager > ytd-search",
    scroll: "#contents.ytd-section-list-renderer",
    container: "#contents.ytd-item-section-renderer",
  }

  const pageRoot = await find(root, results.root, null)
  const scroll = await find(pageRoot, results.scroll)

  observe(scroll, results.container, container => {
    videoObserver(container, videoCallback)
  }, true)

  function videoObserver(container, videoCallback) {
    // videos in result list are loaded asynchronously
    const resultsVideoSelector = `${results.container} > ${VIDEO_SELECTOR}`
    observe(container, resultsVideoSelector, videoCallback, true)
  }
}