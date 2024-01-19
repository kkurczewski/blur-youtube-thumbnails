function recyclerCallback(callback) {
  const RECYCLABLE_CLASS = "recyclable"

  const recycler = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(node => {
        if (node?.closest == null) {
          node = node.parentElement
        }
        node = node.closest(`.${RECYCLABLE_CLASS}`)
        console.log("Recycling video:", node)
        callback(node)
      })
    })
  })

  async function _callback(video) {
    callback(video)
    video.classList.add(RECYCLABLE_CLASS)

    const config = {
      childList: true,
      characterData: false,
      subtree: false,
    }
    const title = video.queryTitle()
    if (title == null) {
      return
    }
    recycler.observe(title, config)
    const channel = video.queryChannel()
    if (channel != null) {
      recycler.observe(channel, config)
    }
  }

  return _callback
}