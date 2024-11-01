// generic selector
const VIDEO_SELECTORS = {
  channel: "ytd-channel-name #text",
  title: "#video-title",
}
const THUMBNAIL_SELECTOR = "a#thumbnail:is([href^='/watch'],[href^='/shorts'])"

const VIDEO_LINK = "a:is([href^='/watch'],[href^='/shorts'])"
const CHANNEL_LINK = "a[href^='/@']"
const UNIVERSAL_SELECTORS = {
  title: VIDEO_LINK,
  channel: CHANNEL_LINK,
}

window.addEventListener("DOMContentLoaded", async () => {
  console.debug("Blur loaded")

  const { channels, keywords, unblur, disableSearch } = await chrome.storage.local.get()
  document.body.classList.toggle("unblur", unblur ?? false)
  const pageManager = await find(document.body, "#page-manager")

  homePageObserver(pageManager, _blur(VIDEO_SELECTORS))
  watchPageObserver(pageManager, _blur(UNIVERSAL_SELECTORS))
  playlistPageObserver(pageManager, _blur(PLAYLIST_SELECTORS))
  watchPlaylistObserver(pageManager, _blur(WATCH_PLAYLIST_SELECTORS))
  watchEndscreen(pageManager, _blur(WATCH_ENDSCREEN_SELECTORS))

  if (!disableSearch) {
    resultsPageObserver(pageManager, _blur(VIDEO_SELECTORS))
  }

  /** @param {Selectors} selectors */
  function _blur(selectors) {
    return async (/** @type {Element} */ video) => blur(buildVideoNode(video, selectors), channels, keywords)
  }
})

/**
 * @typedef Selectors
 * @property {string} channel
 * @property {string} title
 */