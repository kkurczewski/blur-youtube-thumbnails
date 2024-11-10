/** @param {VideoCallback} videoCallback */
async function resultsPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-search")
  const scroll = await find(pageRoot, "#primary #contents")

  const callback = recyclerCallback(videoCallback)

  const ITEMS_CONTAINER = "#items"
  const wrapperObserver = new DirectChildObserver(element => {
    if (element.matches(`:has(${ITEMS_CONTAINER} ${VIDEO_LINK})`)) {
      // video container
      wrapperObserver.observe(element.querySelector(ITEMS_CONTAINER))
    } else if (element.matches(`:has(${VIDEO_LINK})`)) {
      // single video
      callback(element)
    }
  })

  observeDirectChildrens(scroll, async page => {
    const wrapper = await find(page, "#contents")
    wrapperObserver.observe(wrapper)
  })
}