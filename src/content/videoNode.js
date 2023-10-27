class VideoNode {
  #node
  #title
  #channel

  constructor(node, title, channel) {
    this.#node = node
    this.#title = title
    this.#channel = channel
  }

  get title() {
    return this.#title.textContent
  }

  get channel() {
    return this.#channel.textContent
  }

  blur(enabled) {
    return this.#node.classList.toggle("blur", enabled)
  }
}

async function buildVideoNode(node, selectors) {
  console.assert(node != null)
  return new VideoNode(
    node,
    await find(node, selectors.title),
    selectors.channel != null ? await find(node, selectors.channel) : '',
  )
}