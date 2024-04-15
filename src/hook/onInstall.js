const channels = {
  whitelist: ["add new channels here"],
  blacklist: [""],
}
const keywords = {
  whitelist: [],
  blacklist: [".*"],
}

// @ts-ignore
/** @typedef {import("chrome")} */

chrome.runtime.onInstalled.addListener(async () => {
  const options = await chrome.storage.local.get()
  if (Object.entries(options).length === 0) {
    chrome.storage.local.set({ channels, keywords, showHelp: true })
    chrome.runtime.openOptionsPage()
  }
})

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage()
})