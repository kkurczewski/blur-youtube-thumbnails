const VIDEO_CONTAINER = "#dismissible"
const VIDEO_TITLE = "#video-title"
const VIDEO_SELECTOR = `${VIDEO_CONTAINER}:has(${VIDEO_TITLE}):not(:has(${VIDEO_CONTAINER}))`

class Video {
  #node
  #title
  #channel

  constructor(node) {
    this.#node = node
    this.#channel = node.querySelector("ytd-channel-name #text")
    this.#title = node.querySelector("#video-title")
    console.debug("Processed video with title: ", this.#title.innerText)
  }

  get title() {
    return this.#title.textContent
  }

  get channel() {
    return this.#channel.textContent // may be empty for shorts
  }

  blur(enabled) {
    return this.#node.classList.toggle("blur", enabled)
  }

  onRecycled(callback) {
    const observer = new MutationObserver(() => callback(this))
    const shortsConfig = { characterData: true, subtree: true }
    const config = { childList: true, ...shortsConfig }
    observer.observe(this.#title, config)
  }
}