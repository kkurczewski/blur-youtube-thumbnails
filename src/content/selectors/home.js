// home page

async function homePageObserver(root, videoCallback) {
  const home = {
    root: "#page-manager > ytd-browse[page-subtype=home]",
    scroll: ":has(> ytd-rich-grid-row)",
    container: "ytd-rich-grid-row,:has(~ ytd-rich-grid-row):not(:last-child)",
    channel: "#details .ytd-channel-name",
    title: "#details #video-title",
  }

  const pageRoot = await find(root, home.root, null)
  const scroll = await find(pageRoot, home.scroll)

  observe(scroll, home.container, container => {
    // home grid is loaded synchronously
    container.querySelectorAll(VIDEO_SELECTOR).forEach(video => {
      videoCallback(new Video(video, home.channel, home.title))
    })
  })
}