const VIDEO_LINK = "a:is([href^='/watch'],[href^='/shorts'])"
const CHANNEL_LINK = "a:is([href^='/@'],[href^='/c/'])"

// generic selector
const VIDEO_SELECTORS = {
  title: `${VIDEO_LINK}:not(:has(img))`,
  channel: `${CHANNEL_LINK}:not(:has(img))`,
}

window.addEventListener("DOMContentLoaded", async () => {
  console.debug("Blur loaded")

  // @ts-ignore
  const { channels, keywords, unblur, disableSearch } = await chrome.storage.local.get()
  const pageManager = await find(document.body, "#page-manager")
  pageManager.classList.toggle("unblur", unblur ?? false)

  const genericSelector = querySelector(VIDEO_SELECTORS)

  homePageObserver(pageManager, blur(genericSelector))
  watchPageObserver(pageManager, blur(querySelector({ ...VIDEO_SELECTORS, channel: WATCH_PAGE_CHANNEL })))
  playlistPageObserver(pageManager, blur(genericSelector))
  watchPlaylistObserver(pageManager, blur(querySelector(WATCH_PLAYLIST_SELECTORS)))
  watchEndscreen(pageManager, blur(querySelector(WATCH_ENDSCREEN_SELECTORS)))

  if (!disableSearch) {
    resultsPageObserver(pageManager, blur(genericSelector))
  }

  // on channel page videos doesn't contain channel name, channel name is included only in top header
  channelVideos(pageManager, blur(video => ({
    title: video.querySelector(`h3 ${VIDEO_LINK}`),
    channel: document.querySelector("#page-manager > ytd-browse[page-subtype=channels] #page-header span"),
  })))

  /** @param {(video: Element) => VideoElements} selector */
  function blur(selector) {
    /** @param {Element} video */
    return (video) => {
      const selected = selector(video)
      const { title, channel } = selected
      if (title == null) {
        console.error("Title was null:", video)
        return
      }
      const enabled = matchKeywords(title.textContent.trim(), channel?.textContent?.trim(), channels, keywords)
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