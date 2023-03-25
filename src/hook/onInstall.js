const channels = {
    whitelist: ["add new channels here"],
    blacklist: [""],
}
const keywords = {
    whitelist: [],
    blacklist: [".*"],
}

chrome.runtime.onInstalled.addListener(async () => {
    const options = await chrome.storage.local.get()
    if (!options) {
        chrome.storage.local.set({ channels, keywords })
    }
});