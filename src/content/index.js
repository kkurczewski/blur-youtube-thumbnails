const CSS_BLUR_ENABLED = "blurring-enabled"

document.body.classList.toggle(CSS_BLUR_ENABLED)

setTimeout(callback, 3000);
setInterval(callback, 10_000);

function callback() {
    const nodes = query(selectors.video);
    console.debug(`Found ${nodes.length} nodes applicable to blur`)

    nodes.forEach(node => blur(process(node)))
    console.debug("Blur finished")

    function query(selector) {
        return document.querySelectorAll(selector);
    }

    function process(node) {
        const channel = node.querySelector(selectors.channel).innerText
        const title = node.querySelector(selectors.title).innerText

        return { channel, title, node }
    }
}