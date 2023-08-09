const VIDEO_CONTAINER = "#dismissible"
const VIDEO_TITLE = "#video-title"
const VIDEO_SELECTOR = `${VIDEO_CONTAINER}:has(${VIDEO_TITLE}):not(:has(${VIDEO_CONTAINER}))`

class Video {
  #node
  #title
  #channel

  constructor(node) {
    this.#node = node
    this.#channel = node.querySelector("ytd-channel-name")
    this.#title = node.querySelector("#video-title")
    console.debug("Processed video with title: ", this.#title.innerText)
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