async function homePageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=home]")
  const scroll = await find(pageRoot, "#primary #contents")

  const recyclingCallback = recyclerCallback(videoCallback)
  const slotObserver = new DirectChildObserver(node => {
    // observe all slots for changes
    if (node.matches(":has(a#thumbnail:is([href^='/watch'],[href^='/shorts']))")) {
      // but apply blur only on videos or shorts
      recyclingCallback(node)
    }
  })

  observeDirectChildrens(scroll, row => {
    const CONTENT_SLOT = "#content:not(:has(#content))"
    row.querySelectorAll(`${CONTENT_SLOT}`).forEach(slot => {
      slotObserver.observe(slot)
    })
  })
}