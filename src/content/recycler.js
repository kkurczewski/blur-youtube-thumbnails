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

  const recycler = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(/** @param {?Element} node */ node => {
        if (node?.closest == null) {
          node = node.parentElement
        }

        // sometines mutated element is removed from DOM after being added and then lookup will return null
        const recyclable = node.closest(`.${RECYCLABLE_CLASS}`)
        if (recyclable != null) {
          console.trace("Recycling video:", recyclable)
          callback(recyclable)
        }
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