// home page

const selectors = (() => {
    const channelSelector = "#details .ytd-channel-name"
    const titleSelector = "#details #video-title"
    return {
        video: `#contents #content:has(ytd-thumbnail):has(${channelSelector}):has(${titleSelector})`,
        channel: channelSelector,
        title: titleSelector,
    }
})()