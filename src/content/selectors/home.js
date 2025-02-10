/**
 * @param {Element} root
 * @param {VideoCallback} videoCallback 
 */
async function homePageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=home]")
  const scroll = await find(pageRoot, "#primary #contents")

  const recyclingCallback = recyclerCallback(videoCallback)
  const slotObserver = new DirectChildObserver(node => {
    // observe all slots for changes...
    if (node.matches(`:has(${VIDEO_LINK})`)) {
      // ...but apply blur only on videos or shorts
      recyclingCallback(node)
    }
  })

  const NON_POSTS = ":scope:not(:has([href^='/post/']))"
  const CONTENT_SLOT = "#content:not(:has(#content))"
  observeDirectChildrens(scroll, row => {
    row.querySelectorAll(`${NON_POSTS} ${CONTENT_SLOT}`).forEach(slot => {
      slotObserver.observe(slot)
    })
  })
}