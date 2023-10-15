class PlaylistCover {
  #node
  #title
  #channel

  constructor(node) {
    console.assert(node != null)
    this.#node = node
    this.#channel = node.querySelector("#text")
    this.#title = node.querySelector("#owner-text")
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