function blur(video, channels, keywords) {
  const channelWhitelist = channels.whitelist
  const channelBlacklist = channels.blacklist
  const titleWhitelist = keywords.whitelist
  const titleBlacklist = keywords.blacklist

  return video.blur(isBlacklisted(video) && !isWhitelisted(video))

  function isBlacklisted(video) {
    const blackListedChannel = channelBlacklist.some(it => video?.channel?.match(RegExp(it, "i")) != null) ?? false
    const blackListedTitle = titleBlacklist.some(it => video.title.match(RegExp(it, "i")) != null)

    return blackListedChannel || blackListedTitle
  }

  function isWhitelisted(video) {
    const whitelistedChannel = channelWhitelist.some(it => video?.channel?.match(RegExp(it, "i")) != null) ?? false
    const whitelistedTitle = titleWhitelist.some(it => video.title.match(RegExp(it, "i")) != null)

    return whitelistedChannel || whitelistedTitle
  }
}