// home page
async function homePageObserver(root, videoCallback) {
  // setup observers
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=home]")
  const scroll = await find(pageRoot, "#primary #contents")
  const recyclingCallback = recyclerCallback(videoCallback)

  const rowObserver = new DirectChildObserver(recyclingCallback)

  observeDirectChildrens(scroll, container => {
    container.querySelectorAll("#contents").forEach(row => {
      // videos can be randomly replaced in each row hence need to observe each row
      rowObserver.observe(row)
    })
  })
}