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
  if (Object.entries(options).length === 0) {
    chrome.storage.local.set({ channels, keywords })
    chrome.runtime.openOptionsPage()
  }
})