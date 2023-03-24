const nodes = (() => {
  const channels = document.querySelector("#channels")
  const keywords = document.querySelector("#keywords")
  return {
    channels: {
      whitelist: channels.querySelector(".whitelist"),
      blacklist: channels.querySelector(".blacklist"),
    },
    keywords: {
      whitelist: keywords.querySelector(".whitelist"),
      blacklist: keywords.querySelector(".blacklist"),
    }
  }
})()

window.onload = async () => {
  const options = await preloadOptions()

  assignEntries(nodes.channels.whitelist, options.channels.whitelist)
  assignEntries(nodes.channels.blacklist, options.channels.blacklist)
  assignEntries(nodes.keywords.whitelist, options.keywords.whitelist)
  assignEntries(nodes.keywords.blacklist, options.keywords.blacklist)

  function assignEntries(list, entries) {
    const firstElement = list.firstElementChild
    entries.forEach(entry => {
      const li = firstElement.cloneNode()
      li.textContent = entry
      list.append(li)
    })
    if (entries.length > 0) {
      firstElement.remove()
    }
  }
}

document.querySelector("#save").onclick = () => {
  const channels = {
    whitelist: extractValues(nodes.channels.whitelist),
    blacklist: extractValues(nodes.channels.blacklist),
  }
  const keywords = {
    whitelist: extractValues(nodes.keywords.whitelist),
    blacklist: extractValues(nodes.keywords.blacklist),
  }
  saveAllOptions({ channels, keywords })

  function extractValues(list) {
    return Array.from(list.children)
      .map(child => child.innerText)
      .filter(value => value)
  }
}