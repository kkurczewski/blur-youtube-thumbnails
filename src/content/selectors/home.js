// home page

async function homePageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=home]")
  const scroll = await find(pageRoot, "#primary #contents")

  observeDirectChildrens(scroll, container => {
    container
      .querySelectorAll(VIDEO_SELECTOR)
      .forEach(videoCallback)

    // on Chrome last row may load with one or two videos instead full row of four
    // what is peculiar is fact that problem doesn't occur on Chromium
    if (container.matches("ytd-rich-grid-row:last-of-type")) {
      observeDirectChildrens(container.querySelector("#contents"), videoCallback)
    }
  })
}