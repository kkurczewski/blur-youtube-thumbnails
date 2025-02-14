/**
 * @callback VideoCallback
 * @param {Element} video
 * 
 * @returns {VideoElements}
 */

/**
 * @param {VideoCallback} callback
 * @returns {(video: Element) => void}
 */
function recyclerCallback(callback) {
  const RECYCLABLE_CLASS = "recyclable"

  const recycler = new MutationObserver(mutations => {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach(/** @param {?Element} node */ node => {
        if (node?.closest == null) {
          node = node.parentElement
        }

        // sometimes mutated element is removed from DOM after being added and then lookup will return null
        const recyclable = node.closest(`.${RECYCLABLE_CLASS}`)
        if (recyclable != null) {
          console.trace("Recycling video:", recyclable)
          callback(recyclable)
        }
      })
    })
  })

  /** @param {Element} video */
  function recyclingCallback(video) {
    const { title, channel } = callback(video)
    video.classList.add(RECYCLABLE_CLASS)

    const config = {
      childList: true,
      characterData: true,
      subtree: true,
    }
    recycler.observe(title, config)

    if (channel != null) {
      recycler.observe(channel, config)
    }
  }

  return recyclingCallback
}