async function homePageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=home]")
  const scroll = await find(pageRoot, "#primary #contents")

  const recyclingCallback = recyclerCallback(videoCallback)
  const slotObserver = new DirectChildObserver(recyclingCallback)

  observeDirectChildrens(scroll, row => {
    row.querySelectorAll("#contents > * #content:not(:has(#content)):has(img)").forEach(slot => {
      slotObserver.observe(slot)
    })
  })
}