// mobile home page
/** @param {VideoCallback} videoCallback */
async function homePageObserver(root, videoCallback) {
  const browse = await find(root, "ytm-browse")
  const tab = await find(browse, ".tab-content")
  const contents = await find(tab, ".rich-grid-renderer-contents:has(ytm-rich-section-renderer)")

  observeDirectChildrens(contents, videoCallback)
}

/** @param {VideoCallback} videoCallback */
async function homePageShortsObserver(root, videoCallback) {
  const browse = await find(root, "ytm-browse")
  const tab = await find(browse, ".tab-content")
  const contents = await find(tab, ".rich-grid-renderer-contents:has(ytm-rich-section-renderer)")
  const shortsContent = await find(contents, ".rich-section-content")
  const shortsItems = await find(shortsContent, ".reel-shelf-items")

  shortsItems.childNodes.forEach(videoCallback)
}