const channels = {
    whitelist: ["add new channels here"],
    blacklist: [""],
}
const keywords = {
    whitelist: [],
    blacklist: [".*"],
}

chrome.runtime.onInstalled.addListener(() => chrome.storage.local.set({ channels, keywords }));