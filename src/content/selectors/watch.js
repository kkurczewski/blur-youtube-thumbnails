// watch page, right panel

const selectors = (() => {
    const channelSelector = ".details #channel-name"
    const titleSelector = ".details #video-title"
    return {
        video: `#items ytd-compact-video-renderer:has(ytd-thumbnail):has(${channelSelector}):has(${titleSelector})`,
        channel: channelSelector,
        title: titleSelector,
    }
})()