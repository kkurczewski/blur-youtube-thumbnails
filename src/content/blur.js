const CSS_BLUR = "blur"

const titleBlacklist = [];
const titleWhitelist = [];
const channelBlacklist = [];
const channelWhitelist = [];

function blur(video) {
    if (isBlacklisted(video) && !isWhitelisted(video)) {
        video.node.classList.add(CSS_BLUR)
        console.debug("Blurred", video.title)
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