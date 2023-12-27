// generic selector
const MOBILE_VIDEO_SELECTORS = {
  title: "h3 > .yt-core-attributed-string",
  channel: ".media-item-metadata :not(h3) > .yt-core-attributed-string",
}

window.addEventListener("load", async () => {
  const { channels, keywords } = await chrome.storage.local.get()
  const app = await find(document.body, "#app")

  // mobile page has strange reload behavior
  // every time transition occurs nodes are removed from DOM tree
  // hence new observer needs to be created every time
  observeDirectChildrens(app, _ => {
    const container = app.querySelector(".page-container:not(.blur-installed)")
    if (container != null) {
      // transition from watch page to home page misses page container node
      // therefore observe all nodes and lock using marker class
      container.classList.toggle("blur-installed", true)

      homePageObserver(container, _blur(MOBILE_VIDEO_SELECTORS))
      homePageShortsObserver(container, _blur({ ...MOBILE_VIDEO_SELECTORS, channel: null }))
      watchPageObserver(container, _blur(MOBILE_VIDEO_SELECTORS))
    }
  })

  function _blur(selectors) {
    return async video => blur(await buildVideoNode(video, selectors), channels, keywords)
  }
})