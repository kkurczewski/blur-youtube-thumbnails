const CSS_BLUR = "blur"

function blur(video, options) {
    const { channels, keywords } = options
    const channelWhitelist = channels.whitelist
    const channelBlacklist = channels.blacklist
    const titleWhitelist = keywords.whitelist
    const titleBlacklist = keywords.blacklist

    if (isBlacklisted(video) && !isWhitelisted(video)) {
        video.node.classList.add(CSS_BLUR)
    }

    function isBlacklisted(video) {
        const blackListedChannel = channelBlacklist.some(it => video.channel.match(it) != null)
        const blackListedTitle = titleBlacklist.some(it => video.title.match(it) != null)

        return blackListedChannel || blackListedTitle
    }

    function isWhitelisted(video) {
        const whitelistedChannel = channelWhitelist.some(it => video.channel.match(it) != null)
        const whitelistedTitle = titleWhitelist.some(it => video.title.match(it) != null)

        return whitelistedChannel || whitelistedTitle
    }
}