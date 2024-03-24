async function resultsPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-search")
  const scroll = await find(pageRoot, "#primary #contents")

  const callback = recyclerCallback(videoCallback)

  const wrapperObserver = new DirectChildObserver(element => {
    if (element.matches(":has(#items #video-title")) {
      // video container
      wrapperObserver.observe(element.querySelector("#items"))
    } else if (element.matches(":has(#video-title)")) {
      // single video
      callback(element)
    }
    // channel renderer has no title, ignore
  })

  observeDirectChildrens(scroll, async page => {
    const wrapper = await find(page, "#contents")
    wrapperObserver.observe(wrapper)
  })
}