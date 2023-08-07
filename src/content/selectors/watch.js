// watch page, right panel

async function watchPageObserver(root, videoCallback) {
  const watch = {
    player: "#page-manager > ytd-watch-flexy",
    items: "#related #items",
  }

  const playerContainer = await find(root, watch.player, null)
  const itemsContainer = await find(playerContainer, watch.items, null)

  observe(itemsContainer, VIDEO_SELECTOR, videoCallback, true)
}