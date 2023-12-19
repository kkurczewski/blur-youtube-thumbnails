// home page
async function homePageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=home]")
  const scroll = await find(pageRoot, "#primary #contents")
  const rowObserver = new DirectChildObserver(videoCallback)

  observeDirectChildrens(scroll, container => {
    container.querySelectorAll("#contents").forEach(row => {
      // videos can be randomly replaced in each row hence need to observe each row
      rowObserver.observe(row)
    })
  })
}