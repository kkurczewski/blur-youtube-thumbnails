/**
 * @param {Element} root
 * @param {VideoCallback} videoCallback 
 */
async function channelVideos(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=channels]")
  const tabsWrapper = await find(pageRoot, "#primary")

  const videoObserver = new DirectChildObserver(video => {
    if (video.matches(`:has(${VIDEO_LINK})`)) {
      videoCallback(video)
    }
  })

  observeDirectChildrens(tabsWrapper, tabPage => {
    const sharedRoot = tabPage.querySelector("#contents")
    observeDirectChildrens(sharedRoot, tab => {
      // home and playlist tabs use nested container
      if (tab.matches(":has(#contents)")) {
        const wrapper = tab.querySelector("#contents")
        observeDirectChildrens(wrapper, section => {
          section.querySelectorAll("#items").forEach(scroll => {
            videoObserver.observe(scroll)
          })
        })
      } else {
        // videos, shorts and live tabs use direct container
        videoObserver.observe(tab)
      }
    })
  })
}