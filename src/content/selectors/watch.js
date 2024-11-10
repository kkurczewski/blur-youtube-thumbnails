const CVR_TITLE = "ytd-compact-video-renderer #video-title"
const LVM_TITLE = "yt-lockup-view-model a[href^='/watch']"

const CVR_CHANNEL = "ytd-compact-video-renderer #channel-name #text"
const LVM_CHANNEL = "yt-lockup-view-model a[href^='/@']"

const WATCH_NEXT_SELECTORS = {
  title: `:is(${CVR_TITLE}, ${LVM_TITLE})`,
  channel: `:is(${CVR_CHANNEL}, ${LVM_CHANNEL})`,
}

const ITEM_CONTAINER_LOGGED = "#items #contents"
const ITEM_CONTAINER_ANONYMOUS = "#items.ytd-watch-next-secondary-results-renderer:not(:has(> yt-related-chip-cloud-renderer))"

/** @param {VideoCallback} videoCallback */
async function watchPageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-watch-flexy")
  const relatedItems = await find(pageRoot, "#related") // first step, limit deep search scope

  const container = await find(relatedItems, `:is(${ITEM_CONTAINER_LOGGED}, ${ITEM_CONTAINER_ANONYMOUS})`, true) // deep search, ignore DOM structure
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