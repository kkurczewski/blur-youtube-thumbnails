// search results

async function resultsPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-search")
  const scroll = await find(pageRoot, "#primary #contents")

  observeDirectChildrens(scroll, async page => {
    const wrapper = await find(page, "#contents")
    observeDirectChildrens(wrapper, (container) => {
      container
        .querySelectorAll(VIDEO_SELECTOR)
        .forEach(videoCallback)
    })
  })
}