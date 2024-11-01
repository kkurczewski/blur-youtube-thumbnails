// container for new 'yt-lockup-view-model' nodes, used for logged users
const LVM_ITEMS = "#items #contents"

// container for old 'ytd-compact-video-renderer' nodes, used for anonymous users
const CVR_ITEMS = "#items.ytd-watch-next-secondary-results-renderer:not(:has(> yt-related-chip-cloud-renderer))";

/** @param {VideoCallback} videoCallback */
async function watchPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const relatedItems = await find(pageRoot, "#related") // first step, limit deep search scope

  const container = await find(relatedItems, `:is(${LVM_ITEMS}, ${CVR_ITEMS})`, true) // deep search, ignore DOM structure
  const recyclingCallback = recyclerCallback(videoCallback)

  observeDirectChildrens(container, video => {
    if (video.matches(`:has(${VIDEO_LINK})`)) {
      recyclingCallback(video)
    }
  })
}

const WATCH_PLAYLIST_SELECTORS = {
  channel: "#byline",
  title: "#video-title",
}

/** @param {VideoCallback} videoCallback */
async function watchPlaylistObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const container = await find(pageRoot, "#playlist #items")
  // sometimes there is slight delay when loading videos so observe children for resiliency
  observeDirectChildrens(container, videoCallback)
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