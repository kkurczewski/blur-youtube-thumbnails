/**
 * @param {(HTMLElement) => void} callback
 * 
 * @returns {(HTMLElement) => void}
 */
function recyclerCallback(callback) {
  const RECYCLABLE_CLASS = "recyclable"
  const RECYCLABLE_SELECTOR = `.${RECYCLABLE_CLASS}`

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

  function _callback(video) {
    callback(video)
    video.classList.add(RECYCLABLE_CLASS)

    const config = {
      childList: true,
      characterData: true,
      subtree: true,
    }
    const title = video.queryTitle()
    recycler.observe(title, config)

    const channel = video.queryChannel()
    if (channel != null) {
      recycler.observe(channel, config)
    }
  }

  return _callback
}