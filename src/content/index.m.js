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
  observeDirectChildrens(app, container => {
    if (container.matches(".page-container")) {
      homePageObserver(container, _blur(MOBILE_VIDEO_SELECTORS))
      watchPageObserver(container, _blur(MOBILE_VIDEO_SELECTORS))
    }
  })

  function _blur(selectors) {
    return async video => blur(await buildVideoNode(video, selectors), channels, keywords)
  }
})