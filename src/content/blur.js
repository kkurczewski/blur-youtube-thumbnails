/**
 * @typedef {queryTitle: () => HTMLElement, queryChannel: () => HTMLElement} Video
 * 
 * @param {Video} video
 * @param {{blacklist, whitelist}} channels
 * @param {{blacklist, whitelist}} keywords
 * 
 * @returns {boolean} true if video was blurred
 */
async function blur(video, channels, keywords) {
  const title = video.queryTitle().textContent
  const channel = video.queryChannel()?.textContent

  console.table({
    title,
    channel,
    blurred: isBlacklisted() && !isWhitelisted(),
  })
  console.debug(title, channel, video)

  return video.classList.toggle("blur", isBlacklisted() && !isWhitelisted())

  function isBlacklisted() {
    const titleBlacklist = keywords.blacklist
    const channelBlacklist = channels.blacklist

    return matchesKeywords(titleBlacklist, channelBlacklist)
  }

  function isWhitelisted() {
    const titleWhitelist = keywords.whitelist
    const channelWhitelist = channels.whitelist

    return matchesKeywords(titleWhitelist, channelWhitelist)
  }

  function matchesKeywords(titleKeywords, channelKeywords) {
    const titleMatches = matches(titleKeywords, title)
    const channelMatches = matches(channelKeywords, channel) ?? false

    return titleMatches || channelMatches

    function matches(keywords, key) {
      return (key != null) ? keywords.some(it => key.match(RegExp(it, "i")) != null) : null
    }
  }
}