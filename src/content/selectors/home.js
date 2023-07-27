// home page

async function homePageObserver(root, videoCallback) {
  const home = {
    root: "#page-manager > ytd-browse[page-subtype=home]",
    scroll: ":has(> ytd-rich-grid-row)",
    container: "ytd-rich-grid-row,:has(~ ytd-rich-grid-row):not(:last-child)",
  }

  const pageRoot = await find(root, home.root, null)
  const scroll = await find(pageRoot, home.scroll)

  observe(scroll, home.container, container => {
    // videos in grid row are loaded synchronously
    const homeVideoSelector = `:only-child > :only-child${VIDEO_SELECTOR}`
    container.querySelectorAll(homeVideoSelector).forEach(videoCallback)
  })
}