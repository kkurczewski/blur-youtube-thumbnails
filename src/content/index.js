// generic selector
const VIDEO_SELECTORS = {
  channel: "ytd-channel-name #text",
  title: "#video-title",
}

window.addEventListener("load", async () => {
  const { channels, keywords } = await chrome.storage.local.get()
  const pageManager = await find(document.body, "#page-manager")

  homePageObserver(pageManager, recyclingBlur(VIDEO_SELECTORS))
  watchPageObserver(pageManager, _blur(VIDEO_SELECTORS))
  resultsPageObserver(pageManager, _blur(VIDEO_SELECTORS))
  playlistPageObserver(pageManager, _blur(PLAYLIST_SELECTORS))
  watchPlaylistObserver(pageManager, _blur(WATCH_PLAYLIST_SELECTORS))

  function _blur(selectors) {
    return async video => blur(await buildVideoNode(video, selectors), channels, keywords)
  }

  function recyclingBlur(selectors) {
    const RECYCLABLE_CLASS = "recyclable"

    const recycler = new MutationObserver(mutations => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(async node => {
          if (node?.closest == null) {
            node = node.parentElement
          }
          node = node.closest(`.${RECYCLABLE_CLASS}`)
          console.log("recycler", node)
          blur(node, channels, keywords)
        })
      })
    })

    return async video => {
      await _blur(selectors)(video)
      video.classList.add(RECYCLABLE_CLASS)
      const config = {
        childList: true,
        characterData: false,
        subtree: false,
      }
      const title = await video.queryTitle()
      const channel = await video.queryChannel()
      recycler.observe(title, config)
      recycler.observe(channel, config)
    }
  }
})
