window.addEventListener("load", async () => {
  const { channels, keywords } = await chrome.storage.local.get()
  const pageManager = await find(document.body, "#page-manager")

  homePageObserver(pageManager, blurVideo("home"))
  watchPageObserver(pageManager, blurVideo("watch"))
  resultsPageObserver(pageManager, blurVideo("results"))
  playlistObserver(pageManager, (video) => blur(video, channels, keywords))

  function blurVideo(metricName) {
    const recycler = new MutationObserver(mutations => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
          let containerNode = node.parentNode
          while (!containerNode.matches(VIDEO_CONTAINER)) {
            containerNode = containerNode.parentNode
          }
          _blurVideo(containerNode)
          console.count(`recycled video ${metricName}`)
        })
      })
    })

    return videoElement => {
      const video = _blurVideo(videoElement)
      video.registerRecycler(recycler)
    }

    function _blurVideo(videoElement) {
      const video = new Video(videoElement)
      _blur(video, channels, keywords)
      console.count(`processed video ${metricName}`)

      return video

      function _blur(video, channels, keywords) {
        if (blur(video, channels, keywords)) {
          console.count(`blurred video ${metricName}`)
        }
      }
    }
  }
})