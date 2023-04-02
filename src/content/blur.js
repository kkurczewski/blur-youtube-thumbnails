const CSS_BLUR = "blur"

function blur(video, channels, keywords) {
    const channelWhitelist = channels.whitelist
    const channelBlacklist = channels.blacklist
    const titleWhitelist = keywords.whitelist
    const titleBlacklist = keywords.blacklist

    if (isBlacklisted(video) && !isWhitelisted(video)) {
        video.node.classList.add(CSS_BLUR)
    }

    function isBlacklisted(video) {
        const blackListedChannel = channelBlacklist.some(it => video.channel.match(RegExp(it, "i")) != null)
        const blackListedTitle = titleBlacklist.some(it => video.title.match(RegExp(it, "i")) != null)

        return blackListedChannel || blackListedTitle
    }

    function isWhitelisted(video) {
        const whitelistedChannel = channelWhitelist.some(it => video.channel.match(RegExp(it, "i")) != null)
        const whitelistedTitle = titleWhitelist.some(it => video.title.match(RegExp(it, "i")) != null)

        return whitelistedChannel || whitelistedTitle
    }
}