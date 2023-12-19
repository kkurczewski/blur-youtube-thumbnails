async function buildVideoNode(node, selectors) {
  node.queryTitle = async () => await find(node, selectors.title)
  node.queryChannel = async () => selectors.channel != null ? await find(node, selectors.channel) : null
  node.toggleBlur = (enabled) => node.classList.toggle("blur", enabled)

  return node
}