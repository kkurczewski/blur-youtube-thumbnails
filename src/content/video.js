const VIDEO_SELECTOR = "#dismissible:has(#video-title)"

class Video {
  #node
  #title
  #channel

  constructor(node) {
    this.#node = node
    this.#channel = node.querySelector("ytd-channel-name")
    this.#title = node.querySelector("#video-title")
  }

  get title() {
    return this.#title.innerText
  }

  get channel() {
    return this.#channel?.innerText // optional for shorts
  }

  blur(enabled) {
    return this.#node.classList.toggle("blur", enabled)
  }

  onRecycled(callback) {
    const observer = new MutationObserver(() => callback(this))
    const config = { subtree: true, characterData: true }
    observer.observe(this.#title, config)
  }
}