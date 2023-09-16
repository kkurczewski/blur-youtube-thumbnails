// home page

async function homePageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=home]")
  const scroll = await find(pageRoot, "#primary #contents")

  const tailObserver = new DirectChildObserver(videoCallback)

  observeDirectChildrens(scroll, container => {
    container
      .querySelectorAll(VIDEO_SELECTOR)
      .forEach(videoCallback)

    // last loaded row may load with one or two videos instead full row of four elements
    // after scrolling down row is filled up but that elements are missed in top observer
    if (container.matches("ytd-rich-grid-row:last-of-type:not(:first-child)")) {
      tailObserver.observe(container.querySelector("#contents"))
    }
  })
}