const SHORT_TITLE = "a[href^='/shorts']:not(:has(img))"
const YT_MIX_TITLE = "yt-lockup-view-model a[href^='/watch']"
const VIDEO_LINK = "a:is([href^='/watch'],[href^='/shorts'])"

// generic selector
const VIDEO_SELECTORS = {
  title: `#video-title, ${YT_MIX_TITLE}, ${SHORT_TITLE}`,
  channel: "#channel-name #text",
}

window.addEventListener("DOMContentLoaded", async () => {
  console.debug("Blur loaded")

  const { channels, keywords, unblur, disableSearch } = await chrome.storage.local.get()
  document.body.classList.toggle("unblur", unblur ?? false)
  const pageManager = await find(document.body, "#page-manager")

  homePageObserver(pageManager, _blur(VIDEO_SELECTORS))
  watchPageObserver(pageManager, _blur(VIDEO_SELECTORS))
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