// watch page, right panel

async function watchPageObserver(root, videoCallback) {
  const watch = await find(root, "ytm-watch")
  const content = await find(watch, ".watch-content")
  const related = await find(content, "[data-content-type=related] lazy-list")

  observeDirectChildrens(related, async video => {
    // filter continuation and navigation bar
    if (video.matches(".item")) {
      videoCallback(video)
    }
  })
}