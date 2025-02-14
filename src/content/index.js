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

  // @ts-ignore
  const { channels, keywords, unblur, disableSearch } = await chrome.storage.local.get()
  const pageManager = await find(document.body, "#page-manager")
  pageManager.classList.toggle("unblur", unblur ?? false)

  const genericSelector = querySelector(VIDEO_SELECTORS)

  homePageObserver(pageManager, blur(genericSelector))
  watchPageObserver(pageManager, blur(genericSelector))
  playlistPageObserver(pageManager, blur(genericSelector))
  watchPlaylistObserver(pageManager, blur(querySelector(WATCH_PLAYLIST_SELECTORS)))
  watchEndscreen(pageManager, blur(querySelector(WATCH_ENDSCREEN_SELECTORS)))

  if (!disableSearch) {
    resultsPageObserver(pageManager, blur(genericSelector))
  }

  // on channel page videos doesn't contain channel name, channel name is included only in top header
  channelVideos(pageManager, blur(video => ({
    title: video.querySelector(VIDEO_SELECTORS.title),
    channel: document.querySelector("#page-manager > ytd-browse[page-subtype=channels] #page-header span"),
  })))

  /** @param {(video: Element) => VideoElements} selector */
  function blur(selector) {
    /** @param {Element} video */
    return (video) => {
      const selected = selector(video)
      const { title, channel } = selected
      const enabled = matchKeywords(title.textContent, channel?.textContent, channels, keywords)
      video.classList.toggle("blur", enabled)

      // return video elements for recycling
      return selected
    }
  }

  /** @param {VideoData} data */
  function querySelector(data) {
    return (/** @type {Element} */ video) => ({
      title: video.querySelector(data.title),
      channel: video.querySelector(data.channel), // channel is nullable (shorts)
    })
  }
})

/**
 * @typedef VideoElements
 * @property {Element} channel
 * @property {Element} title
 */

/**
 * @typedef VideoData
 * @property {string} channel
 * @property {string} title
 */