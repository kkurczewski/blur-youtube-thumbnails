// mobile home page

const MOBILE_TITLE_SELECTORS = {
  title: "h3 > .yt-core-attributed-string",
}

const MOBILE_VIDEO_SELECTORS = {
  ...MOBILE_TITLE_SELECTORS,
  channel: ".media-item-metadata :not(h3) > .yt-core-attributed-string",
}

async function homePageObserver(root, videoCallback) {
  const browse = await find(root, "ytm-browse")
  const tab = await find(browse, ".tab-content")
  const contents = await find(tab, ".rich-grid-renderer-contents:has(ytm-rich-section-renderer)")

  observeDirectChildrens(contents, async video => {
    videoCallback(await buildVideoNode(video, MOBILE_VIDEO_SELECTORS))
  })

  const shortsContent = await find(contents, ".rich-section-content")
  const shortsItems = await find(shortsContent, ".reel-shelf-items")
  for (const short of shortsItems.children) {
    videoCallback(await buildVideoNode(short, MOBILE_TITLE_SELECTORS))
  }
}