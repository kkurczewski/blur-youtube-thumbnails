function recyclerCallback(callback) {
  const RECYCLABLE_SELECTOR = ".recyclable"

  const recycler = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(node => {
        if (node?.closest == null) {
          node = node.parentElement
        }
        node = node.closest(RECYCLABLE_SELECTOR)
        console.log("Recycling video:", node)
        callback(node)
      })
    })
  })

  async function _callback(video) {
    callback(video)
    video.classList.add(RECYCLABLE_SELECTOR)

    const config = {
      childList: true,
      characterData: true,
      subtree: true,
    }
    const title = video.queryTitle()
    console.assert(title != null, "title node was null")

    recycler.observe(title, config)
    const channel = video.queryChannel()
    if (channel != null) {
      recycler.observe(channel, config)
    }
  }

  return _callback
}