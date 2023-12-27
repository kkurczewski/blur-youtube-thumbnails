// generic selector
const VIDEO_SELECTORS = {
  channel: "ytd-channel-name #text",
  title: "#video-title",
}

window.addEventListener("load", async () => {
  console.debug("Blur loaded")

  const { channels, keywords } = await chrome.storage.local.get()
  const pageManager = await find(document.body, "#page-manager")

  homePageObserver(pageManager, _blur(VIDEO_SELECTORS))
  watchPageObserver(pageManager, _blur(VIDEO_SELECTORS))
  resultsPageObserver(pageManager, _blur(VIDEO_SELECTORS))
  playlistPageObserver(pageManager, _blur(PLAYLIST_SELECTORS))
  watchPlaylistObserver(pageManager, _blur(WATCH_PLAYLIST_SELECTORS))
  watchEndscreen(pageManager, _blur(WATCH_ENDSCREEN_SELECTORS))

  function _blur(selectors) {
    return async video => blur(await buildVideoNode(video, selectors), channels, keywords)
  }
})
