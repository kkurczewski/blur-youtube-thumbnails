const channels = {
    whitelist: ["add new channels here"],
    blacklist: ["add new keywords here"],
}
const keywords = {
    whitelist: ["add new keywords here"],
    blacklist: ["add new keywords here"],
}

chrome.runtime.onInstalled.addListener(() => chrome.storage.local.set({ channels, keywords }));