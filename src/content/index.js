window.addEventListener("load", async () => {
  const { channels, keywords } = await chrome.storage.local.get()
  const pageManager = await find(document.body, "#page-manager")

  homePageObserver(pageManager, blurVideo("home"))
  watchPageObserver(pageManager, blurVideo("watch"))
  resultsPageObserver(pageManager, blurVideo("results"))

  function blurVideo(metricName) {
    const recycler = new MutationObserver(mutations => {
      mutations.forEach(({ addedNodes }) => {
        addedNodes.forEach(node => {
          let containerNode = node.parentNode
          while (!containerNode.matches(VIDEO_CONTAINER)) {
            containerNode = containerNode.parentNode
          }
          _blur(new Video(containerNode), channels, keywords)
          console.count(`recycled video ${metricName}`)
        })
      })
    })

    return _blurVideo

    function _blurVideo(videoElement) {
      const video = new Video(videoElement)
      video.registerRecycler(recycler)
      _blur(video, channels, keywords)
      console.count(`processed video ${metricName}`)
    }

    function _blur(video, channels, keywords) {
      if (blur(video, channels, keywords)) {
        console.count(`blurred video ${metricName}`)
      }
    }
  }
})