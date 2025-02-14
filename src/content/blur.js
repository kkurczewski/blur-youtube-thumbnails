/**
* @param {string} title
* @param {string} channel
* @param {Tags} channels
* @param {Tags} keywords
* 
* @returns {boolean}
*/
function matchKeywords(title, channel, channels, keywords) {
  return isBlacklisted() && !isWhitelisted()

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
      return key != null ? keywords.some(it => key.match(RegExp(it, "i")) != null) : null
    }
  }
}

/**
 * @typedef Tags
 * @property {[string]} whitelist
 * @property {[string]} blacklist
 */