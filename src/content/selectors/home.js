// home page

async function homePageObserver(root, videoCallback) {
  const pageRoot = await find(root, "#page-manager > ytd-browse[page-subtype=home]")
  const scroll = await find(pageRoot, "#primary #contents")

  const rowObserver = new DirectChildObserver(video => {
    if (video.matches(":has(#video-title)")) {
      videoCallback(video)
    }
  })

  observeDirectChildrens(scroll, wrapper => {
    const row = wrapper.querySelector("#contents:not(:has(#contents))")
    // last element is continuation and always results in null
    if (row != null) {
      rowObserver.observe(row)
    }
  })
}