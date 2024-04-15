/**
 * @callback VideoCallback
 * @param {Element} video 
 * @returns {void}
 */

/**
 * @param {VideoCallback} callback 
 * @returns {VideoCallback}
 */
function recyclerCallback(callback) {
  const RECYCLABLE_CLASS = "recyclable"
  const RECYCLABLE_SELECTOR = `.${RECYCLABLE_CLASS}`

  const recycler = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(/** @param {?Element} node */ node => {
        if (node?.closest == null) {
          node = node.parentElement
        }
        node = node.closest(RECYCLABLE_SELECTOR)
        console.log("Recycling video:", node)
        callback(node)
      })
    })
  })

  /** @param {Video & Element} video */
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