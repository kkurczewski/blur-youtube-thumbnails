async function buildVideoNode(node, selectors) {
  // bind selectors to video node, this simplifies passing selectors to recycler
  // and allows to register recycler inside home page instead of polluting index file
  node.queryTitle = async () => await find(node, selectors.title)
  node.queryChannel = async () => selectors.channel != null ? await find(node, selectors.channel) : null

  return node
}