window.addEventListener("load", async () => {
  const { channels, keywords } = await chrome.storage.local.get()
  const app = await find(document.body, "#app")

  // mobile page has strange reload behavior
  // every time transition occurs nodes are removed from DOM tree
  // hence new observer needs to be created every time
  observeDirectChildrens(app, container => {
    if (container.matches(".page-container")) {
      homePageObserver(container, _blur)
      watchPageObserver(container, _blur)
    }
  })

  function _blur(video) {
    blur(video, channels, keywords)
  }
})