// mobile home page
async function homePageObserver(root, videoCallback) {
  const browse = await find(root, "ytm-browse")
  const tab = await find(browse, ".tab-content")
  const contents = await find(tab, ".rich-grid-renderer-contents:has(ytm-rich-section-renderer)")

  observeDirectChildrens(contents, videoCallback)

  const shortsContent = await find(contents, ".rich-section-content")
  const shortsItems = await find(shortsContent, ".reel-shelf-items")
  for (const short of shortsItems.children) {
    videoCallback(await buildVideoNode(short, { ...MOBILE_VIDEO_SELECTORS, channel: null }))
  }
}