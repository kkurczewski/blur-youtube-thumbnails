// search results

async function resultsPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-search")
  const scroll = await find(pageRoot, "#primary #contents")

  const wrapperObserver = new DirectChildObserver(container => {
      container
        .querySelectorAll(VIDEO_SELECTOR)
        .forEach(videoCallback)
    })

  observeDirectChildrens(scroll, async page => {
    const wrapper = await find(page, "#contents")
    wrapperObserver.observe(wrapper)
  })
}