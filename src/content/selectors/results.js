// search results

const selectors = (() => {
    const channelSelector = "#meta .ytd-channel-name a"
    const titleSelector = "#video-title"
    return {
        video: `#contents ytd-video-renderer:has(ytd-thumbnail):has(${channelSelector}):has(${titleSelector})`,
        channel: channelSelector,
        title: titleSelector,
    }
})()