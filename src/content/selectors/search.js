/** @param {VideoCallback} videoCallback */
async function resultsPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-search")
  const scroll = await find(pageRoot, "#primary #contents")

  const callback = recyclerCallback(videoCallback)

  const NESTED_LIST = "#items:not(ytd-video-renderer *)" // exclude videos with chapters
  const wrapperObserver = new DirectChildObserver(element => {
    const nestedList = element.querySelector(NESTED_LIST)
    if (nestedList != null) {
      wrapperObserver.observe(nestedList)
    } else if (element.matches(`:has(${VIDEO_LINK})`)) {
      callback(element)
    }
  })

  observeDirectChildrens(scroll, async page => {
    const wrapper = await find(page, "#contents")
    wrapperObserver.observe(wrapper)
  })
}