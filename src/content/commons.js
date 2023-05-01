const VIDEO_SELECTOR = ":has(> ytd-thumbnail)"

class Video {
    #node
    constructor(node, channelSelector, titleSelector) {
        this.#node = node
        this.title = node.querySelector(titleSelector).innerText
        this.channel = node.querySelector(channelSelector)?.innerText // optional for shorts
    }

    blur(enabled) {
        this.#node.classList.toggle("blur", enabled)
    }
}