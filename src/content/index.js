window.addEventListener("load", async () => {
  const { channels, keywords } = await chrome.storage.local.get()
  const pageManager = await find(document.body, "#page-manager")
  homePageObserver(pageManager, blurVideo("home"))
  watchPageObserver(pageManager, blurVideo("watch"))
  resultsPageObserver(pageManager, blurVideo("results"))

  function blurVideo(metricName) {
    return _blurVideo

    function _blurVideo(videoElement) {
      const video = new Video(videoElement)
      video.onRecycled(it => {
        _blur(it, channels, keywords)
        console.count(`recycled video ${metricName}`)
      })
      _blur(video, channels, keywords)
      console.count(`processed video ${metricName}`)

      function _blur(video, channels, keywords) {
        if (blur(video, channels, keywords)) {
          console.count(`blurred video ${metricName}`)
        }
      }
    }
  }
})