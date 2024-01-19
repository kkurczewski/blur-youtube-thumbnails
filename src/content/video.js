async function buildVideoNode(node, selectors) {
  // bind selectors to video node, this simplifies passing selectors to recycler
  // and allows to register recycler inside home page instead of polluting index file
  node.queryTitle = () => node.querySelector(selectors.title)
  node.queryChannel = () => node.querySelector(selectors.channel)

  return node
}