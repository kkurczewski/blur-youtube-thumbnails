const VIDEO_CONTAINER = "#dismissible"
const VIDEO_TITLE = "#video-title"
const VIDEO_SELECTOR = `${VIDEO_CONTAINER}:has(${VIDEO_TITLE}):not(:has(${VIDEO_CONTAINER}))`

class Video {
  #node
  #title
  #channel
  #isShort

  constructor(node) {
    console.assert(node != null)
    this.#node = node
    this.#channel = node.querySelector("ytd-channel-name #text")
    this.#title = node.querySelector("#video-title")
    this.#isShort = this.#channel == ''
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

  registerRecycler(recycler) {
    const config = {
      childList: !this.#isShort,
      characterData: this.#isShort,
      subtree: this.#isShort,
    }
    recycler.observe(this.#title, config)
    recycler.observe(this.#channel, config)
  }
}