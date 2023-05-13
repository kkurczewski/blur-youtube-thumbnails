const VIDEO_SELECTOR = ":has(> ytd-thumbnail)"

class Video {
  #node
  #title
  #channel

  constructor(node) {
    this.#node = node
    this.#title = node.querySelector("#video-title")
    this.#channel = node.querySelector("ytd-channel-name")
  }

  get title() {
    return this.#title.innerText
  }

  get channel() {
    return this.#channel?.innerText // optional for shorts
  }

  blur(enabled) {
    this.#node.classList.toggle("blur", enabled)
  }

  onRecycled(callback) {
    const observer = new MutationObserver(() => callback(this))
    const config = { subtree: true, characterData: true }
    observer.observe(this.#title, config)
  }
}