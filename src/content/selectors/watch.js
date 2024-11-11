const ITEM_CONTAINER_LOGGED = "#items #contents"
const ITEM_CONTAINER_ANONYMOUS = "#items:not(:has(#contents))"

/** @param {VideoCallback} videoCallback */
async function watchPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const relatedItems = await find(pageRoot, "#related")

  const ITEM_CONTAINER_LOADED = `:has(${VIDEO_LINK}):is(${ITEM_CONTAINER_LOGGED}, ${ITEM_CONTAINER_ANONYMOUS})`
  const container = await find(relatedItems, ITEM_CONTAINER_LOADED, true) // deep search, ignore DOM structure
  console.debug("Found", container)

  const recyclingCallback = recyclerCallback(videoCallback)
  observeDirectChildrens(container, video => {
    if (video.matches(`:has(${VIDEO_LINK})`)) {
      recyclingCallback(video)
    }
  })
}

const WATCH_ENDSCREEN_SELECTORS = {
  channel: ".ytp-videowall-still-info-author",
  title: ".ytp-videowall-still-info-title",
}

// watch page, endscreen suggestions
/** @param {VideoCallback} videoCallback */
async function watchEndscreen(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const player = await find(pageRoot, "#movie_player")

  observeDirectChildrens(player, container => {
    if (container.matches(":has(> .ytp-endscreen-content)")) {
      const endscreen = container.querySelector(".ytp-endscreen-content")
      observeDirectChildrens(endscreen, videoCallback)
    }
  })
}