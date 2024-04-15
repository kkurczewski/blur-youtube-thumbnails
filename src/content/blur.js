/**
 * @typedef Tags
 * @property {[string]} whitelist
 * @property {[string]} blacklist
 */

/**
* @param {Video & Element} video
* @param {Tags} channels
* @param {Tags} keywords
* 
* @returns {boolean} true if video was blurred
*/
function blur(video, channels, keywords) {
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

  /** 
   * @param {[string]} titleKeywords
   * @param {[string]} channelKeywords
   */
  function matchesKeywords(titleKeywords, channelKeywords) {
    const titleMatches = matches(titleKeywords, title)
    const channelMatches = matches(channelKeywords, channel) ?? false

    return titleMatches || channelMatches

    /** 
     * @param {[string]} keywords 
     * @param {string} key 
     */
    function matches(keywords, key) {
      return (key != null) ? keywords.some(it => key.match(RegExp(it, "i")) != null) : null
    }
  }
}