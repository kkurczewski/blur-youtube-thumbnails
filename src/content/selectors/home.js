// home page

async function homePageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=home]")
  const scroll = await find(pageRoot, "#primary #contents")

  observeDirectChildrens(scroll, container => {
    container
      .querySelectorAll(VIDEO_SELECTOR)
      .forEach(videoCallback)
  })
}