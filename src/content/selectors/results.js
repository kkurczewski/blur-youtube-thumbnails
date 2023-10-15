// search results

async function resultsPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-search")
  const scroll = await find(pageRoot, "#primary #contents")

  const wrapperObserver = new DirectChildObserver(element => {
    if (element.matches(":has(#items #video-title")) {
      wrapperObserver.observe(element.querySelector("#items"))
    } else if (element.matches(":has(#video-title)")) { // channel renderer has no title
      videoCallback(element)
    }
  })

  observeDirectChildrens(scroll, async page => {
    const wrapper = await find(page, "#contents")
    wrapperObserver.observe(wrapper)
  })
}