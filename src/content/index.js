window.addEventListener("load", async () => {
  const { channels, keywords } = await chrome.storage.local.get()
  const pageManager = await find(document.body, "#page-manager")
  homePageObserver(pageManager, blurVideo)
  watchPageObserver(pageManager, blurVideo)
  resultsPageObserver(pageManager, blurVideo)

  function blurVideo(videoElement) {
    const video = new Video(videoElement)
    video.onRecycled(it => blur(it, channels, keywords))
    blur(video, channels, keywords)
  }
})